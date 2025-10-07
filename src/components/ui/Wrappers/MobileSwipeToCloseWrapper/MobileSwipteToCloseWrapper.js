import React, { useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import styles from "./MobileSwipeToCloseWrapper.module.css";

const SWIPE_CLOSE_THRESHOLD = 90;
const MAX_DRAG = 120;

const MobileSwipeToCloseWrapper = ({ children, onClose }) => {
  const y = useMotionValue(0);
  const controls = useAnimation();
  const startYRef = useRef(0);
  const dragAllowedRef = useRef(true);

  if (typeof window !== "undefined" && window.innerWidth > 730) return children;

  const handleDragStart = (event, info) => {
    startYRef.current = info.point.y;
    const scrollableParent = findNearestScrollableParent(event.target);

    // Only allow drag if the scrollable parent is at top or doesn't exist
    dragAllowedRef.current = !scrollableParent || scrollableParent.scrollTop === 0;
  };

  const handleDragEnd = async (event, info) => {
    const delta = info.point.y - startYRef.current;

    if (!dragAllowedRef.current) {
      // Snap back if drag was blocked
      controls.start({ y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
      return;
    }

    if (delta > SWIPE_CLOSE_THRESHOLD) {
      await controls.start({ y: MAX_DRAG, opacity: 0, transition: { duration: 0.18 } });
      onClose?.(y.get());
      controls.set({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
    }
  };

  return (
    <div className={styles.mobileOnly}>
      <motion.div
        className={styles.wrapper}
        drag="y"
        dragConstraints={{ top: 0, bottom: MAX_DRAG }}
        dragElastic={0.3}       // resistance effect
        dragMomentum={false}    // disable momentum to prevent overshoot
        style={{ y }}
        animate={controls}
        initial={{ y: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragPropagation={false} // prevent interfering with scrollable children
        dragListener={true}
      >
        <div className={styles.pillContainer}>
          <div className={styles.pill} />
        </div>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
};

// Only check the nearest scrollable parent
function findNearestScrollableParent(el) {
  while (el && el !== document.body) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default MobileSwipeToCloseWrapper;
