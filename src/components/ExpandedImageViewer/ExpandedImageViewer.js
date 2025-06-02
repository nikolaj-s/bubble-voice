import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import styles from "./ExpandedImageViewer.module.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const SWIPE_CLOSE_DISTANCE = -120;

export const ExpandedImageViewer = ({ src, onClose }) => {
  const containerRef = useRef();
  const imgRef = useRef();
  const [zoom, setZoom] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  // NEW: Track image loading/error state
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useLayoutEffect(() => {
    setImgLoading(true);
    setImgError(false);

    const img = new window.Image();
    img.onload = () => {
      setNaturalSize({ width: img.width, height: img.height });
      setImgLoading(false);
      setImgError(false);
    };
    img.onerror = () => {
      setImgError(true);
      setImgLoading(false);
    };
    img.src = src;
  }, [src]);

  // Double-tap support for mobile
  const lastTap = useRef(0);
  const handleImageClick = e => {
    let nextZoom = zoom === 1 ? MAX_ZOOM : 1;

    if (window.innerWidth < 800) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        setZoom(nextZoom);
        if (containerRef.current && imgRef.current && nextZoom !== 1) {
          centerScroll(e);
        }
      }
      lastTap.current = now;
    } else {
      setZoom(nextZoom);
      if (containerRef.current && imgRef.current && nextZoom !== 1) {
        centerScroll(e);
      }
    }
  };

  // Center scroll around the click/tap position
  const centerScroll = e => {
    const container = containerRef.current;
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;
    container.scrollLeft = (img.offsetWidth * MAX_ZOOM - container.offsetWidth) * clickX;
    container.scrollTop = (img.offsetHeight * MAX_ZOOM - container.offsetHeight) * clickY;
  };

  // Swipe up to close
  const handleDragEnd = (event, info) => {
    if (zoom > 1) return;
    if (info.offset.y < SWIPE_CLOSE_DISTANCE) {
      setIsClosing(true);
      setTimeout(() => onClose(), 140);
    }
  };

  // Compute img dimensions based on zoom
  const containerWidth = window.innerWidth * 0.96;
  const containerHeight = window.innerHeight * 0.92;
  let imgDisplayWidth = containerWidth;
  let imgDisplayHeight = containerHeight;
  if (naturalSize.width && naturalSize.height) {
    const aspect = naturalSize.width / naturalSize.height;
    if (containerWidth / aspect > containerHeight) {
      imgDisplayHeight = containerHeight;
      imgDisplayWidth = containerHeight * aspect;
    } else {
      imgDisplayWidth = containerWidth;
      imgDisplayHeight = containerWidth / aspect;
    }
  }

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className={styles.overlay}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.underlay} onClick={onClose} />
          <motion.div
            ref={containerRef}
            className={styles.imgScroll}
            drag="y"
            dragElastic={0.18}
            dragConstraints={{ top: -160, bottom: 0 }}
            onDragEnd={handleDragEnd}
            style={{
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              touchAction: "none",
              width: zoom > 1 ? "96vw" : 'auto',
              height: "92vh",
            }}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -180, opacity: 0 }}
            transition={{ type: "spring", stiffness: 330, damping: 35 }}
          >
            {imgLoading && (
              <div className={styles.loaderBox}>
                <div className={styles.spinner} />
                <div className={styles.loadingText}>Loading image…</div>
              </div>
            )}
            {imgError && !imgLoading && (
              <div className={styles.errorBox}>
                <AlertCircle size={38} strokeWidth={2.2} color="var(--error-color)" />
                <div className={styles.errorText}>
                  Couldn’t load image
                  <div style={{ fontSize: "0.93em", marginTop: 4, opacity: 0.8 }}>
                    Please check the image source or try again later.
                  </div>
                  <button
                    className={styles.closeButton}
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {!imgLoading && !imgError && (
              <img
                ref={imgRef}
                src={src}
                alt=""
                className={styles.image}
                style={{
                  width: zoom === 1 ? 'auto' : imgDisplayWidth * zoom,
                  height: imgDisplayHeight * zoom,
                  minHeight: "100%",
                  transition: "width 0.22s, height 0.22s, transform 0.2s cubic-bezier(.5,2,.5,1)",
                  cursor: zoom > 1 ? "grab" : "zoom-in",
                  objectFit: "contain",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "auto",
                  boxShadow: "0 6px 36px rgba(0,0,0,0.32)",
                  borderRadius: 12,
                }}
                draggable={false}
                onClick={handleImageClick}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpandedImageViewer;
