import React from 'react';
import styles from './SkewedGallery.module.css';

export default function SkewedGallery({ images = [] }) {
  return (
    <div className={styles.gallery}>
      {images.map((src, index) => (
        <div key={index} className={styles.card}>
          <img src={src} alt={`Gallery item ${index}`} className={styles.image} />
        </div>
      ))}
    </div>
  );
}
