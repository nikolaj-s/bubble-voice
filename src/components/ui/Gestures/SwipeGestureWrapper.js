import { motion, useAnimation } from 'framer-motion';
import { useRef } from 'react';

const SWIPE_UP_THRESHOLD = -80;
const SWIPE_DOWN_THRESHOLD = 80;

export const SwipeGestureWrapper = ({ 
  children, 
  onSwipeUp, 
  onSwipeDown 
}) => {
  const controls = useAnimation();
  const hasSwiped = useRef(false);

  const handleDragEnd = (event, info) => {
    const deltaY = info.offset.y;

    if (deltaY < SWIPE_UP_THRESHOLD && !hasSwiped.current) {
      hasSwiped.current = true;
      onSwipeUp?.();
    } else if (deltaY > SWIPE_DOWN_THRESHOLD && !hasSwiped.current) {
      hasSwiped.current = true;
      onSwipeDown?.();
    } else {
      // Reset position if not enough swipe
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300 } });
    }

    // Reset swipe state after animation
    setTimeout(() => {
      hasSwiped.current = false;
    }, 300);
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ y: 0 }}
      style={{ touchAction: 'none' }}
    >
      {children}
    </motion.div>
  );
};
