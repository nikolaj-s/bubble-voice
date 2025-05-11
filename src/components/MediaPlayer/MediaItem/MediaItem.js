import React from 'react';
import styles from './MediaItem.module.css';
import { Ellipsis, Music2 } from 'lucide-react';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { triggerContext } from '../../../lib/services/helperFunctions';

export const MediaItem = ({ title, duration, thumbnail, src, url, inQueue, status, action = () => {}, position, context = {} }) => {

  const [thumbnailError, toggleThumbnailError] = React.useState(false);

  return (
    <div 
    onClick={action}
    id={src} data-context={JSON.stringify(context)} className={styles.mediaItem}>
      {position >= 0 ? <div className={styles.queueIndication}>{position + 1}</div> : null}
      {thumbnail && !thumbnailError ? (
        <img src={thumbnail} alt="" className={styles.thumbnail} onError={() => {toggleThumbnailError(true)}} />
      ) : (
        <div className={styles.fallbackIcon}><Music2 size={20} /></div>
      )}
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.duration}>{formatDuration(duration)}</div>
      </div>
      {!status && 
      <div className={styles.mediaItemButtons}>
        <IconButton 
        Icon={<Ellipsis color='var(--text-color)' />}
        title={'More'}
        onClick={(e) => {triggerContext(e, src)}}
        />
      </div>}
    </div>
  );
};

const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};
