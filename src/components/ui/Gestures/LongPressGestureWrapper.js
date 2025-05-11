import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LONG_PRESS_DURATION = 500; // ms
const MOVE_CANCEL_THRESHOLD = 10; // px

export const LongPressGestureWrapper = ({ children, onTouchContext, width, height, display }) => {
  const timeoutRef = useRef(null);
  const startYRef = useRef(null);
  const movedRef = useRef(false);
  const controls = useAnimation();

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;
    movedRef.current = false;

    timeoutRef.current = setTimeout(() => {
      if (!movedRef.current) {
        controls.start({
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeInOut' },
        }).then(() => {
          onTouchContext?.(e);
          controls.start({
            scale: 1,
            transition: { duration: 0.3, ease: 'easeInOut' },
          })
        })
        
      }
    }, LONG_PRESS_DURATION);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    if (Math.abs(currentY - startYRef.current) > MOVE_CANCEL_THRESHOLD) {
      movedRef.current = true;
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <motion.div
      animate={controls}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'manipulation', position: 'relative', width, height, display }} // allows scroll & tap
    >
      {children}
    </motion.div>
  );
};
