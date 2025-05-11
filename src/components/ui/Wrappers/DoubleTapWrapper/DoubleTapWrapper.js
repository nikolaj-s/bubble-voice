import React, { useRef } from 'react';

const DoubleTapWrapper = ({ onDoubleTap, children }) => {
  const lastTapRef = useRef(0);
  const tapTimeout = 300; // max delay between taps in ms

  const handleTouchEnd = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < tapTimeout) {
      onDoubleTap?.(e);
    }
    lastTapRef.current = now;
  };

  const handleDoubleClick = (e) => {
    onDoubleTap?.(e);
  };

  return (
    <div
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      style={{ touchAction: 'manipulation', width: '100%', height: '100%' }} // prevent delay
    >
      {children}
    </div>
  );
};

export default DoubleTapWrapper;

