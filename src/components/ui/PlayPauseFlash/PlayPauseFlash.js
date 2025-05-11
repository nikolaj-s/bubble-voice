import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import styles from './PlayPauseFlash.module.css';

const PlayPauseFlash = ({ isPlaying }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isPlaying !== null) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 500); // flash for 500ms
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.flashIcon}
          key={isPlaying ? 'pause' : 'play'}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.25 }}
        >
          {isPlaying ? <Pause size={48} /> : <Play size={48} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayPauseFlash;
