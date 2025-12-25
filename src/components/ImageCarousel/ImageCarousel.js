import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ImageCarousel.module.css";

export default function ImageCarousel({
  images = [],
  onImageClick,
  initialIndex = 0,
  className = "",
  showDots = true,
  showArrows = true,
  aspect = "16 / 9",
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [index, setIndex] = useState(() => {
    const i = Number(initialIndex) || 0;
    return Math.max(0, Math.min(i, Math.max(0, safeImages.length - 1)));
  });

  const trackRef = useRef(null);
  const pointerRef = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    moved: false,
  });

  useEffect(() => {
    // Clamp index if images change
    setIndex((prev) => Math.max(0, Math.min(prev, Math.max(0, safeImages.length - 1))));
  }, [safeImages.length]);

  const goTo = (i) => {
    if (!safeImages.length) return;
    setIndex(Math.max(0, Math.min(i, safeImages.length - 1)));
  };

  const next = (e) => {e.stopPropagation(); goTo(index + 1)};
  const prev = (e) => {e.stopPropagation(); goTo(index - 1)};

  const onKeyDown = (e) => {
    if (!safeImages.length) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onPointerDown = (e) => {
    if (safeImages.length <= 1) return;
    pointerRef.current.active = true;
    pointerRef.current.startX = e.clientX;
    pointerRef.current.lastX = e.clientX;
    pointerRef.current.moved = false;
    trackRef.current?.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!pointerRef.current.active) return;
    const dx = e.clientX - pointerRef.current.startX;
    pointerRef.current.lastX = e.clientX;
    if (Math.abs(dx) > 6) pointerRef.current.moved = true;
  };

  const onPointerUp = (e) => {
    if (!pointerRef.current.active) return;
    pointerRef.current.active = false;

    const dx = pointerRef.current.lastX - pointerRef.current.startX;
    const threshold = 40;

    if (dx > threshold) prev();
    else if (dx < -threshold) next();
  };

  const handleImageClick = () => {
    // If user swiped, don't treat it like a click
    if (pointerRef.current.moved) return;
    const url = safeImages[index];
    onImageClick?.(url, index);
  };

  if (!safeImages.length) return null;

  return (
    <div
      className={`${styles.carousel} ${className}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{ aspectRatio: aspect }}
      aria-label="Image carousel"
    >
      <div
        ref={trackRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {safeImages.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className={styles.slide}
              onClick={handleImageClick}
              aria-label={`Open image ${i + 1} of ${safeImages.length}`}
            >
              <img className={styles.image} src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        {showArrows && safeImages.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.left}`}
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className={`${styles.nav} ${styles.right}`}
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {showDots && safeImages.length > 1 && (
        <div className={styles.dots} aria-label="Carousel pagination">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onImageClick: PropTypes.func, // (url, index) => void
  initialIndex: PropTypes.number,
  className: PropTypes.string,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  aspect: PropTypes.string,
};
