// ColorPicker.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Droplet, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ColorPicker.module.css';

// Default Bubble-themed accent colors
const ColorPicker = ({ value, onChange, colors }) => {
  const DEFAULT_COLORS = colors || [
    '#000000', '#1e3a5f', '#4e8e8b', '#3b7a6e',
    '#e16b6b', '#76c7a5', '#dab243', '#d9a6e0',
    '#e0d797', '#f4a261', '#2a9d8f', '#264653'
  ];

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectColor = (col) => {
    onChange(col);
    setOpen(false);
  };

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.toggleButton}
        onClick={() => setOpen(o => !o)}
      >
        <span
          className={styles.swatch}
          style={{ backgroundColor: value }}
        />
        <Droplet className={styles.icon} size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={styles.colorGrid}>
              {DEFAULT_COLORS.map(col => (
                <button
                  key={col}
                  className={styles.colorButton}
                  style={{ backgroundColor: col }}
                  onClick={() => selectColor(col)}
                >
                  {col === value && <Check className={styles.check} size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;