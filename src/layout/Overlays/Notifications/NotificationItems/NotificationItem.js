
import styles from './NotificationItem.module.css';
import NotificationReplyItem from './NotificationReplyItem.js/NotificationReplyItem';
import { getTimeAgo } from '../../../../lib/services/getTimeAgo';
import { Subtitle } from '../../../../components/ui/Titles/Subtitle/Subtitle';
import { NotificationInviteItem } from './NotificationInviteItem/NotificationInviteItem';
import { NotificationPokeItem } from './NotificationPokeItem/NotificationPokeItem';
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton';
import { X } from 'lucide-react';

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
    case 'server_invite':
    case 'channel_invite':
      ContentComponent = NotificationInviteItem;
      break;
    case 'poke':
      ContentComponent = NotificationPokeItem;
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
        <div className={styles.header}>
          <Subtitle>{notification.title}</Subtitle>
          <IconButton width={18} height={18} padding={2} title={'Delete'} onClick={() => {onDelete(notification)}} Icon={X} />
        </div>
     
        <ContentComponent {...notification} onAccept={() => {onClick({...notification, accepted: true})}} onDecline={() => {onClick({...notification, accepted: false})}} />
        <Subtitle>{getTimeAgo(createdAt)}</Subtitle>
    </div>
  );
};

export default NotificationItem;
