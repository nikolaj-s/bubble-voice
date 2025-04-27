import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import styles from './CarouselGallery.module.css';

export const CarouselGallery = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const childrenArray = React.Children.toArray(children);
  const hasChildren = childrenArray.length > 0;

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? childrenArray.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev === childrenArray.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  if (!hasChildren) {
    return (
      <div className={styles.noMedia}>
        <ImageOff size={48} />
        <p>No Media Available</p>
      </div>
    );
  }

  return (
    <div
      className={styles.carouselWrapper}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.carouselContent}>
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            className={styles.carouselItem}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {childrenArray[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {childrenArray.length > 1 && (
        <>
          <button className={`${styles.navButton} ${styles.left}`} onClick={handlePrev}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${styles.navButton} ${styles.right}`} onClick={handleNext}>
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {childrenArray.length > 1 && (
        <div className={styles.counter}>
          {current + 1}/{childrenArray.length}
        </div>
      )}
    </div>
  );
};
