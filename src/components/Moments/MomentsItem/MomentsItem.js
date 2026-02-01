
import styles from './MomentsItem.module.css';
import { Bookmark } from 'lucide-react';
import { Text } from '../../ui/Text/Text';
import { Description } from '../../ui/Description/Description';
import { TextIndicator } from '../../ui/TextIndicator/TextIndicator';
import { useSelector } from 'react-redux';
import MicroInfo from '../../MicroInfo/MicroInfo';

export const MomentsItem = ({ moment = {}, onClick }) => {

  const { name, description, createdAt, thumbnail, _id, created_by, channel_id, messages, server_id } = moment;

  const channel = useSelector(state => state.channelsSlice.channels?.[channel_id]);

  const user = useSelector(state => state.serverUsersSlice.users?.[created_by]);
  
  return (
    <button
      className={`${styles.item} ${thumbnail && (styles.hasThumbnail)}`}
      onClick={() => onClick(moment)}
      aria-label={`Open moment ${name}`}
      data-context={JSON.stringify({type: 'moment', _id, name, description, createdAt})}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={name}
          className={styles.thumbnail}
        />
      ) : (
        <div className={styles.iconContainer}>
          <Bookmark size={24} />
        </div>
      )}

      <div className={styles.content}>
        {moment.new && (<TextIndicator backgroundColor='var(--success-color)' title='NEW' />)}
        <Text>{moment.name}</Text>
        {description && (
          <Description textAlign={'start'}  description={moment.description} />
        )}
        <MicroInfo channelId={channel_id} channelName={channel?.channel_name} createdBy={user} messageId={messages[0]} serverId={server_id}  />
        <div className={styles.date}>
          {new Date(createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>
    </button>
  );
};
