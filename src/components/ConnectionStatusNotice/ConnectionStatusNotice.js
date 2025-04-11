// components/ConnectionStatusNotice.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Wifi } from 'lucide-react';
import styles from './ConnectionStatusNotice.module.css';
import { setConnectionState } from '../../features/Connection/connectionSlice';

const ConnectionStatusNotice = () => {
  const status = useSelector((state) => state.connectionSlice.status);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (status === 'reconnected') {
      timer = setTimeout(() => dispatch(setConnectionState('connected')), 3000);
    }
    return () => clearTimeout(timer);
  }, [status, dispatch]);

  return (
    <AnimatePresence>
      {status === 'disconnected' && (
        <motion.div
          key="disconnected"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={styles.notice}
        >
          <AlertTriangle size={20} /> Lost connection. Trying to reconnect...
        </motion.div>
      )}
       {status === 'duplicate' && (
        <motion.div
          key="duplicate"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={styles.notice}
        >
          <AlertTriangle size={20} /> Disconnected due to duplicate connection
        </motion.div>
      )}
      {status === 'reconnected' && (
        <motion.div
          key="reconnected"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${styles.notice} ${styles.reconnected}`}
        >
          <Wifi size={20} /> Reconnected
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectionStatusNotice;
