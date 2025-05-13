import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ZoomableImage.module.css';

/**
 * ZoomableImage Component (click-to-zoom at cursor point)
 * 
 * @param {string} src - The image URL
 * @param {string} [alt] - Alt text for the image
 * @param {function} [onLoad] - Callback when image loads
 * @param {function} [onError] - Callback when image fails to load
 * @param {number} [transitionDuration] - Duration of zoom animation in seconds
 */
const ZoomableImage = ({
  src,
  alt = '',
  onLoad,
  onError,
  transitionDuration = 0.1,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x: `${offsetX}%`, y: `${offsetY}%` });
    setIsZoomed((z) => !z);
  };

  return (
    <div
    className={styles.wrapper} onClick={handleClick}>
      <motion.img
        draggable={false}
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={`${styles.image} ${isZoomed ? styles.zoomed : ''}`}
        animate={{ scale: isZoomed ? 2 : 1 }}
        style={{ transformOrigin: `${origin.x} ${origin.y}` }}
        transition={{ duration: transitionDuration }}
      />
    </div>
  );
};

export default ZoomableImage;
