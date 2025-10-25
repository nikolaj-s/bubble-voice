import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import styles from "./ExpandedImageViewer.module.css";
import { ExpandedMediaWrapper } from "../ui/Wrappers/ExpandedMediaWrapper/ExpandedMediaWrapper";
import { Card } from "../ui/Wrappers/Card/Card";
import { Text } from "../ui/Text/Text";

/**
 * images: optional array of images. Each item can be:
 *   - string (src), or
 *   - object { src, alt?, id? }
 * currentIndex: controlled index (optional)
 * defaultIndex: initial index for uncontrolled mode (default 0)
 * onChange(image, index): called whenever the active image changes
 */
const normalizeImage = (img, fallbackAlt = "") =>
  typeof img === "string" ? { src: img, alt: fallbackAlt } : img || {};

const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(pointer: coarse)").matches;

export default function ExpandedImageViewer({
  // single-image props (remain supported)
  src,
  alt,
  // overlay control
  open,
  onClose,
  context,

  // multi-image props
  images = [],
  currentIndex, // controlled
  defaultIndex = 0, // uncontrolled
  onChange, // (image, index) => void

  // optional: hide thumbs
  hideThumbnails = false,
}) {
  const hasMulti = Array.isArray(images) && images.length > 0;

  // -------- Zoom / expand state --------
  const [expanded, setExpanded] = useState(false);

  // -------- Error state (per active image) --------
  const [error, setError] = useState(false);

  // -------- Scroll refs --------
  const scrollRef = useRef(null);

  // -------- Index management (controlled/uncontrolled) --------
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const activeIndex =
    hasMulti && typeof currentIndex === "number"
      ? currentIndex
      : uncontrolledIndex;

  const activeImage = hasMulti
    ? normalizeImage(images[activeIndex], `Image ${activeIndex + 1}`)
    : normalizeImage(src ? { src, alt } : null, alt || "Image");

  // -------- Mobile detection for swipe --------
  const [mobile, setMobile] = useState(isCoarsePointer());
  useEffect(() => {
    const mql = window.matchMedia?.("(pointer: coarse)");
    const listener = () => setMobile(isCoarsePointer());
    try {
      mql?.addEventListener("change", listener);
    } catch {
      mql?.addListener?.(listener);
    }
    return () => {
      try {
        mql?.removeEventListener("change", listener);
      } catch {
        mql?.removeListener?.(listener);
      }
    };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Reset error on image change
  useEffect(() => {
    setError(false);
  }, [activeIndex, activeImage?.src]);

  // Toggle zoom/expand — do not trigger on drag
  const dragMovedRef = useRef(false);
  const handleExpand = (e) => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false; // reset for next gesture
      return;
    }
    setExpanded((prev) => !prev);
    requestAnimationFrame(() => {
      if (!scrollRef.current || !e?.clientX) return;
      scrollRef.current.scrollTo(e.clientX, e.clientY * 1.5);
    });
  };

  // Change index helper
  const emitChange = useCallback(
    (nextIdx) => {
      if (!hasMulti) return;
      const clamped = Math.max(0, Math.min(images.length - 1, nextIdx));
      const img = normalizeImage(images[clamped], `Image ${clamped + 1}`);
      if (typeof currentIndex !== "number") {
        setUncontrolledIndex(clamped);
      }
      onChange?.(img, clamped);
    },
    [hasMulti, images, currentIndex, onChange]
  );

  const next = useCallback(() => {
    if (!hasMulti) return;
    emitChange(activeIndex + 1);
  }, [hasMulti, activeIndex, emitChange]);

  const prev = useCallback(() => {
    if (!hasMulti) return;
    emitChange(activeIndex - 1);
  }, [hasMulti, activeIndex, emitChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (!hasMulti) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hasMulti, next, prev, onClose]);

  // -------- Framer Motion swipe handling (mobile only) --------
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();

  // Thresholds
  const SWIPE_OFFSET = 80; // px
  const SWIPE_VELOCITY = 600; // px/s

  // Helper to animate out/in on successful swipe
  const animateSwap = useCallback(
    async (dir /* -1 = swipe left -> next, 1 = swipe right -> prev */) => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1000;

      // slide current image OUT in the swipe direction
      await controls.start({
        x: dir * width * 0.4,          // <- was dir * -width * 0.4
        opacity: 0.6,
        transition: prefersReduced
          ? { duration: 0.1 }
          : { type: "spring", stiffness: 400, damping: 40, mass: 0.8 },
      });

      // change image
      if (dir === -1) next(); // swipe left -> next
      else prev();            // swipe right -> prev

      // position new image on the opposite side and slide IN to center
      await controls.set({ x: -dir * width * 0.25, opacity: 0.6 }); // <- was dir * width * 0.25
      await controls.start({
        x: 0,
        opacity: 1,
        transition: prefersReduced
          ? { duration: 0.12 }
          : { type: "spring", stiffness: 420, damping: 34, mass: 0.8 },
      });
    },
    [controls, next, prev, prefersReduced]
  );


  const onDragEnd = async (_e, info) => {
    const { offset, velocity } = info;
    const dx = offset.x;
    const vx = velocity.x;

    // Mark that a drag occurred so click doesn't toggle zoom
    if (Math.abs(dx) > 3) dragMovedRef.current = true;

    // left swipe (dx < 0) to go next
    if (
      dx < -SWIPE_OFFSET ||
      vx < -SWIPE_VELOCITY
    ) {
      await animateSwap(-1);
      return;
    }

    // right swipe (dx > 0) to go prev
    if (
      dx > SWIPE_OFFSET ||
      vx > SWIPE_VELOCITY
    ) {
      await animateSwap(1);
      return;
    }

    // not enough — snap back
    await controls.start({
      x: 0,
      transition: prefersReduced
        ? { duration: 0.1 }
        : { type: "spring", stiffness: 500, damping: 32, mass: 0.7 },
    });
  };

  // Disable swipe when zoomed in; swiping while “expanded” usually feels awkward
  const enableSwipe = mobile && hasMulti && !expanded;

  if (!open) return null;

  return (
    <ExpandedMediaWrapper onClose={onClose} context={context}>
      <div className={styles.chrome}>
     
        

        {/* Prev / Next */}
        {hasMulti && (
          <>
            <button
              className={`${styles.navBtn} ${styles.leftNav}`}
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`${styles.navBtn} ${styles.rightNav}`}
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      <div
        ref={scrollRef}
        className={`${styles.imageContainer} ${expanded ? styles.expanded : ""}`}
        onClick={handleExpand}
        tabIndex={0}
      >
        {error ? (
          <Card
            style={{
              alignItems: "center",
              textAlign: "center",
              color: "var(--error-color)",
              gap: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle size={36} color="var(--error-color)" />
            <Text>Error Loading Full Image</Text>
          </Card>
        ) : (
          <motion.div
            // Swipe wrapper: only draggable on mobile & when not zoomed
            drag={enableSwipe ? "x" : false}
            dragElastic={0.2}
            dragMomentum={true}
            onDragStart={() => {
              // prepare to distinguish between tap vs drag
              dragMovedRef.current = false;
            }}
            onDragEnd={enableSwipe ? onDragEnd : undefined}
            animate={controls}
            initial={{ x: 0, opacity: 1 }}
            style={{ touchAction: "pan-y" }} // allow vertical page scroll when not dragging
          >
            <img
              key={activeImage?.src || "image"}
              src={activeImage?.src}
              alt={activeImage?.alt || "Image"}
              draggable={false}
              className={styles.image}
              onError={() => setError(true)}
              style={{
                height: expanded ? "200vh" : undefined,
                maxWidth: expanded ? "none" : "100vw",
                maxHeight: expanded ? "none" : "calc(100svh - 115px)",
                cursor: expanded ? "grab" : enableSwipe ? "grab" : "zoom-in",
                userSelect: "none",
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Thumbnails */}
      {hasMulti && !hideThumbnails && (
        <div
          className={styles.thumbsBar}
          onClick={(e) => e.stopPropagation()}
          role="listbox"
          aria-label="Select image"
        >
          {images.map((im, i) => {
            const it = normalizeImage(im, `Thumb ${i + 1}`);
            const isActive = i === activeIndex;
            return (
              <button
                key={it.id || it.src || i}
                className={`${styles.thumb} ${isActive ? styles.thumbActive : ""}`}
                onClick={() => emitChange(i)}
                role="option"
                aria-selected={isActive}
                title={it.alt || `Image ${i + 1}`}
              >
                <img src={it.src} alt={it.alt || `Image ${i + 1}`} />
              </button>
            );
          })}
        </div>
      )}
    </ExpandedMediaWrapper>
  );
}
