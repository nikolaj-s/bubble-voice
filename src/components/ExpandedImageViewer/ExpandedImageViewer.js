import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import styles from "./ExpandedImageViewer.module.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const BOUNCE = 32;
const SWIPE_CLOSE_DISTANCE = 100;

const ExpandedImageViewer = ({ src, onClose }) => {
  const containerRef = useRef();
  const imgRef = useRef();

  const [zoom, setZoom] = useState(1);
  const [targetZoom, setTargetZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const lastPointer = useRef({ x: 0, y: 0 });
  const pinchRef = useRef(null);
  const lastTapRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Clamp with bounce
  const clampPan = (newX, newY, zoomLevel) => {
    if (!imgRef.current) return { x: newX, y: newY };
    const vw = window.innerWidth, vh = window.innerHeight;
    const rect = imgRef.current.getBoundingClientRect();
    const imgW = rect.width * zoomLevel / (zoom || 1);
    const imgH = rect.height * zoomLevel / (zoom || 1);
    const maxX = Math.max(0, (imgW - vw) / 2) + BOUNCE;
    const maxY = Math.max(0, (imgH - vh) / 2) + BOUNCE;
    return {
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    };
  };

  // Animate zoom with ultra-short duration
  useEffect(() => {
    const controls = animate(zoom, targetZoom, {
      type: "spring",
      stiffness: 600,
      damping: 60,
      duration: 0.09,
      onUpdate: v => setZoom(v)
    });
    return () => controls.stop();
  }, [targetZoom]);

  // Clamp x/y on zoom change
  useEffect(() => {
    const { x: clampedX, y: clampedY } = clampPan(x.get(), y.get(), zoom);
    x.set(clampedX);
    y.set(clampedY);
    // eslint-disable-next-line
  }, [zoom]);

  // Double tap to zoom (touch)
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const handler = (e) => {
      if (e.touches && e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          e.preventDefault();
          handleDoubleTap(e.touches[0]);
        }
        lastTapRef.current = now;
      }
    };
    el.addEventListener("touchstart", handler, { passive: false });
    return () => el.removeEventListener("touchstart", handler);
  }, [zoom]);

  // Pan/Zoom handlers
  const handlePointerDown = e => {
    if (e.touches && e.touches.length === 2) {
      pinchRef.current = {
        startDist: getDist(e.touches),
        startZoom: zoom,
        startMid: getMid(e.touches),
        startX: x.get(),
        startY: y.get(),
      };
      setTouchCount(2);
      return;
    }
    setIsDragging(true);
    lastPointer.current = getPoint(e);
    setTouchCount(e.touches ? e.touches.length : 1);
  };

  const handlePointerMove = e => {
    if (e.touches && e.touches.length === 2 && pinchRef.current) {
      const newDist = getDist(e.touches);
      let newZoom = pinchRef.current.startZoom * (newDist / pinchRef.current.startDist);
      newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      setTargetZoom(newZoom);
      const mid = getMid(e.touches);
      const unclamped = {
        x: pinchRef.current.startX + (mid.x - pinchRef.current.startMid.x),
        y: pinchRef.current.startY + (mid.y - pinchRef.current.startMid.y)
      };
      const clamped = clampPan(unclamped.x, unclamped.y, newZoom);
      x.set(clamped.x);
      y.set(clamped.y);
      return;
    }
    if (isDragging && (e.touches || e.buttons === 1)) {
      const point = getPoint(e);
      const unclampedX = x.get() + (point.x - lastPointer.current.x);
      const unclampedY = y.get() + (point.y - lastPointer.current.y);
      const { x: clampedX, y: clampedY } = clampPan(unclampedX, unclampedY, zoom);
      x.set(clampedX);
      y.set(clampedY);
      lastPointer.current = point;
    }
  };

  const handlePointerUp = e => {
    setIsDragging(false);
    setTouchCount(e.touches ? e.touches.length : 0);
    pinchRef.current = null;
    // Swipe up to close (drag up fast/far)
    if (y.get() < -SWIPE_CLOSE_DISTANCE) onClose();
    // Bounce back if needed
    setTimeout(() => {
      const { x: clampedX, y: clampedY } = clampPan(x.get(), y.get(), zoom);
      x.set(clampedX);
      y.set(clampedY);
    }, 0);
  };

  const handleDoubleTap = touch => {
    if (zoom > 1) {
      setTargetZoom(1);
      x.set(0); y.set(0);
    } else {
      zoomAt(touch.clientX, touch.clientY, 2);
    }
  };

  const handleClickZoom = e => {
    const rect = imgRef.current.getBoundingClientRect();
    const zoomLevel = zoom === 1 ? 2 : 1;
    zoomAt(e.clientX, e.clientY, zoomLevel, rect);
  };

  // Zoom at click/tap position (now works as expected)
  const zoomAt = (cx, cy, newZoom, rect) => {
    rect = rect || imgRef.current.getBoundingClientRect();
    const imgCX = rect.left + rect.width / 2, imgCY = rect.top + rect.height / 2;
    const dx = (cx - imgCX), dy = (cy - imgCY);
    const scaleFactor = newZoom / zoom;
    const newX = (x.get() - dx) * scaleFactor + dx;
    const newY = (y.get() - dy) * scaleFactor + dy;
    const { x: clampedX, y: clampedY } = clampPan(newX, newY, newZoom);
    x.set(clampedX);
    y.set(clampedY);
    setTargetZoom(newZoom);
  };

  // Mouse wheel to pan (when zoomed)
  useEffect(() => {
    const onWheel = e => {
      if (zoom > 1) {
        e.preventDefault();
        const unclampedX = x.get() - e.deltaX;
        const unclampedY = y.get() - e.deltaY;
        const { x: clampedX, y: clampedY } = clampPan(unclampedX, unclampedY, zoom);
        x.set(clampedX);
        y.set(clampedY);
        setTimeout(() => {
          const { x: cX, y: cY } = clampPan(x.get(), y.get(), zoom);
          x.set(cX); y.set(cY);
        }, 0);
      }
    };
    const imgEl = imgRef.current;
    imgEl?.addEventListener("wheel", onWheel, { passive: false });
    return () => imgEl?.removeEventListener("wheel", onWheel);
  }, [zoom, x, y]);

  // Mobile swipe up to close
  useEffect(() => {
    let startY = 0, moveY = 0;
    const onTouchStart = e => { if (e.touches.length === 1) startY = e.touches[0].clientY; };
    const onTouchMove = e => { if (e.touches.length === 1) moveY = e.touches[0].clientY; };
    const onTouchEnd = e => {
      if (startY && startY - moveY > SWIPE_CLOSE_DISTANCE) onClose();
      startY = 0; moveY = 0;
    };
    const el = containerRef.current;
    el?.addEventListener("touchstart", onTouchStart, { passive: true });
    el?.addEventListener("touchmove", onTouchMove, { passive: true });
    el?.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", onTouchStart);
      el?.removeEventListener("touchmove", onTouchMove);
      el?.removeEventListener("touchend", onTouchEnd);
    };
  }, [onClose]);

  // Helpers
  const getPoint = e =>
    e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
  const getDist = touches =>
    Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
  const getMid = touches => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  });

  // UNDERLAY: a clickable overlay to close (below the image)
  // Touches/clicks on image do not bubble to underlay
  return (
    <motion.div
      ref={containerRef}
      className={styles.overlay}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.09 }}
      style={{ touchAction: "none" }}
    >
      <div
        className={styles.underlay}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
        aria-label="Close image"
      />
      <motion.img
        ref={imgRef}
        src={src}
        alt=""
        className={styles.image}
        style={{
          x,
          y,
          scale: zoom,
          touchAction: "none",
          cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          borderRadius: 0,
          zIndex: 2,
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          margin: "auto",
        }}
        draggable={false}
        onDoubleClick={handleClickZoom}
        onClick={handleClickZoom}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        transition={{ type: "spring", duration: 0.09 }}
      />
    </motion.div>
  );
};

export default ExpandedImageViewer;
