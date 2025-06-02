import React, { useRef } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styles from "./MobileSwipeToCloseWrapper.module.css";

// Threshold in pixels before triggering close
const SWIPE_CLOSE_THRESHOLD = 90;
const MAX_DRAG = 120;

const MobileSwipeToCloseWrapper = ({ children, onClose }) => {
  const y = useMotionValue(0);
  const controls = useAnimation();
  const startYRef = useRef(0);

  // Only render on mobile (max-width: 730px)
  if (typeof window !== "undefined" && window.innerWidth > 730) return children;

  const handleDragEnd = async (_, info) => {
    // If pulled down past threshold, close
    if (info.point.y - startYRef.current > SWIPE_CLOSE_THRESHOLD) {
      await controls.start({ y: MAX_DRAG, opacity: 0, transition: { duration: 0.18 } });
      const currentY = y.get();
      onClose?.(currentY);
      controls.set({ y: 0, opacity: 1 });
    } else {
      // Snap back if not passed threshold
      controls.start({ y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
    }
  };

  return (
    <div className={styles.mobileOnly}>
      <motion.div
        className={styles.wrapper}
        drag="y"
        dragConstraints={{ top: 0, bottom: MAX_DRAG }}
        style={{ y }}
        animate={controls}
        initial={{ y: 0 }}
        onDragStart={(_, info) => {
          startYRef.current = info.point.y;
        }}
        onDragEnd={handleDragEnd}
      >
        {/* Pill / Bar UI */}
        <div className={styles.pillContainer}>
          <div className={styles.pill} />
        </div>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
};

export default MobileSwipeToCloseWrapper;
