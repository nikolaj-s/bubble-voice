
import { useSelector, useDispatch } from 'react-redux';
import styles from './Toaster.module.css';
import { MediaItem } from '../MediaPlayer/MediaItem/MediaItem';
import { MessageItem } from '../Chat/MessageItem/MessageItem';
import { X } from 'lucide-react';
import { removeNotificationOverlay } from '../../features/Notifications/notificationsSlice';
import { AnimatePresence, motion } from 'framer-motion';


const Toaster = () => {
  const users = useSelector(state => state.serverUsersSlice.users);
  const notifications = useSelector(state => state.notificationsSlice.notifications_overlay);
  const dispatch = useDispatch();

  const dismiss = (id) => dispatch(removeNotificationOverlay(id));

  return (
    <div className={styles.toasterWrapper}>
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            className={`${styles.toast} ${notification.type === 'default' ? styles.defaultToast : ''}`}
            initial={{ x: 100, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className={styles.closeButton}
              onClick={() => dismiss(notification.id)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>

            {(() => {
              switch (notification.type) {
                case 'message':
                  return <MessageItem message={notification} users={users} notification={true} />;
                case 'media':
                  return <MediaItem {...notification} />;
                default:
                  return <p>{notification.message}</p>;
              }
            })()}
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
};

export default Toaster;
