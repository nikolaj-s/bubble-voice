import React from 'react';
import styles from './MomentsItem.module.css';
import { Bookmark } from 'lucide-react';
import { Text } from '../../ui/Text/Text';
import { Description } from '../../ui/Description/Description';
import { TextIndicator } from '../../ui/TextIndicator/TextIndicator';

export const MomentsItem = ({ moment = {}, onClick }) => {
  
  const { name, description, createdAt, thumbnail, _id } = moment;

  // pick the first message with an image
  
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
