import React from 'react';
import styles from './NotificationReplyItem.module.css';

const NotificationReplyItem = ({ sender_id, channel_id, server_id, body }) => (
  <>
    <div className={styles.title}>
      <strong className={styles.sender}>{sender_id.display_name}</strong>
      {' '}in{' '}
      <span className={styles.channel}>{server_id.server_name}</span>
      {' '}/{' '}
      <span className={styles.channel}>#{channel_id.channel_name}</span>
    </div>
    <p className={styles.body}>{body}</p>
  </>
);

export default NotificationReplyItem;
