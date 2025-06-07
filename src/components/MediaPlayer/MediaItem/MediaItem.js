import React from 'react';
import styles from './MediaItem.module.css';
import { Ellipsis, Music2 } from 'lucide-react';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { triggerContext } from '../../../lib/services/helperFunctions';
import { MicroUserDisplay } from '../../ui/MicroUserDisplay/MicroUserDisplay';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';
import DateTimeDisplay from '../../ui/DateTimeDisplay/DateTimeDisplay';
import { UserIndicator } from '../../UserIndicator/UserIndicator';

export const MediaItem = ({ title, duration, thumbnail, src, url, inQueue, added_by, status, action = () => {}, position, context = {}, at }) => {

  const [thumbnailError, toggleThumbnailError] = React.useState(false);

  return (
    <>
  
      <div
      onClick={() => action(context)}
      id={src}
      data-context={JSON.stringify({ ...context, inQueue })}
      className={`${styles.mediaItem} ${status ? styles.playing : ''}`}
    >
     
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          {position >= 0 && <div className={styles.queueIndication}>{position + 1}</div>}
          {thumbnail && !thumbnailError ? (
            <img src={thumbnail} alt="" className={styles.thumbnail} onError={() => toggleThumbnailError(true)} />
          ) : (
            <div className={styles.fallbackIcon}><Music2 size={20} /></div>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles.title}>{title}</div>
          <div className={styles.detailsWrapper}>
            <Subtitle>{formatDuration(Math.floor(duration))}</Subtitle>
          </div>
        </div>

        {!status && (
          <div className={styles.mediaItemButtons}>
            <IconButton
              Icon={<Ellipsis color="var(--text-color)" />}
              title="More"
              onClick={(e) => triggerContext(e, src)}
            />
          </div>
        )}
        </div>
        <UserIndicator label={'added by:'} user_id={added_by} date={at} marginLeft={typeof position === 'number' ? 52 : null} />
    </div>
  </>
  );
};

const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};
