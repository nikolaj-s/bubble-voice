import React from 'react';
import styles from './NotificationItem.module.css';
import NotificationReplyItem from './NotificationReplyItem.js/NotificationReplyItem';
import { getTimeAgo } from '../../../../lib/services/getTimeAgo';
import { Subtitle } from '../../../../components/ui/Titles/Subtitle/Subtitle';
import Label from '../../../../components/ui/Titles/Label/Label';

const NotificationItem = ({ notification, onClick, onDelete }) => {
  const { type, read, createdAt } = notification;

  let ContentComponent;
  switch (type) {
    //case 'message':
    //  ContentComponent = NotificationMessage;
    //  break;
    case 'reply':
      ContentComponent = NotificationReplyItem;
      break;
    //case 'mention':
    //  ContentComponent = NotificationMention;
    //  break;
    //case 'server_invite':
    //  ContentComponent = NotificationServerInvite;
    //  break;
    default:
      return null;
  }

  return (
    <div
      className={`${styles.card} ${!read ? styles.unread : ''}`}
      onClick={() => onClick(notification)}
    >
        <Subtitle>{notification.title}</Subtitle>
        <ContentComponent {...notification} />
        <Subtitle>{getTimeAgo(createdAt)}</Subtitle>
    </div>
  );
};

export default NotificationItem;
