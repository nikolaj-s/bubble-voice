// components/AlertToast.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { hideAlert } from '../../features/Alerts/alertsSlice';

import styles from './AlertToast.module.css';

const AlertToast = () => {
  const dispatch = useDispatch();
  
  const { message, type, visible } = useSelector((state) => state.alertsSlice);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="alert-toast"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${styles.alert} ${styles[type]}`}
        >
          <span>{message}</span>
          <button className={styles.closeButton} onClick={() => dispatch(hideAlert())}>
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToast;