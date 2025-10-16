import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARD_WIDTH = 300;
const CARD_MAX_HEIGHT = 600;
const CARD_MARGIN = 12;

const MousePositionModal = ({ x, y, open, onClose, children, className = "", style = {} }) => {
  const cardRef = useRef();
  const [position, setPosition] = useState({ left: -9999, top: -9999 });
  const [fromDirection, setFromDirection] = useState("left");
  const [cardHeight, setCardHeight] = useState(CARD_MAX_HEIGHT);

  // Observe card size changes
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const height = Math.min(CARD_MAX_HEIGHT, entries[0].contentRect.height);
        setCardHeight(height);
      }
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [children]);

  // Position logic
  useLayoutEffect(() => {
    if (!open || x == null || y == null) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = x + CARD_MARGIN;
    let top = y + CARD_MARGIN;

    // Slide in from right if cursor is right of center
    const slideFrom = (left + CARD_WIDTH / 2) > viewportWidth / 2 ? "right" : "left";
    setFromDirection(slideFrom);

    // Clamp left
    if (left + CARD_WIDTH + CARD_MARGIN > viewportWidth) {
      left = Math.max(viewportWidth - CARD_WIDTH - CARD_MARGIN, CARD_MARGIN);
    }
    // Clamp top
    if (top + cardHeight + CARD_MARGIN > viewportHeight) {
      top = Math.max(viewportHeight - cardHeight - CARD_MARGIN, CARD_MARGIN);
    }

    setPosition({ left, top });
  }, [x, y, open, cardHeight]);

  if (!open || x == null || y == null) return null;

  const variants = {
    hidden: (custom) => ({ opacity: 0, scale: 0.96, x: custom === "right" ? 64 : -64, pointerEvents: "none" }),
    visible: { opacity: 1, scale: 1, x: 0, pointerEvents: "auto", transition: { x: { type: "spring", stiffness: 300, damping: 27 }, opacity: { duration: 0.18 }, scale: { duration: 0.21 } } },
    exit: (custom) => ({ opacity: 0, scale: 0.95, x: custom === "right" ? 64 : -64, pointerEvents: "none", transition: { opacity: { duration: 0.15 }, scale: { duration: 0.14 }, x: { duration: 0.19 } } }),
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 50 }}>
      {/* Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} onClick={onClose} />
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal-card"
            ref={cardRef}
            className={className}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={fromDirection}
            variants={variants}
            style={{
              position: "fixed",
              left: position.left,
              top: position.top,
              width: CARD_WIDTH,
              maxHeight: CARD_MAX_HEIGHT,
              overflowY: "auto",
              background: "var(--card-background-color, #222B3A)",
              color: "var(--text-color, #fff)",
              borderRadius: "var(--border-radius)",
              boxShadow: "0 6px 32px 0 rgba(10,14,20,0.29)",
              zIndex: 10000,
              ...style,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MousePositionModal;
