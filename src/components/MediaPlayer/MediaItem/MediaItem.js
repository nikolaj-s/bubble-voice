import React from 'react';
import styles from './MediaItem.module.css';
import { Ellipsis, Music2, Play } from 'lucide-react';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { triggerContext } from '../../../lib/services/helperFunctions';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';
import { UserIndicator } from '../../UserIndicator/UserIndicator';
import { TextIndicator } from '../../ui/TextIndicator/TextIndicator';
import { useDispatch } from 'react-redux';
import { expandVideo } from '../../../features/Media/ExpandedVideo/expandedVideoSlice';
export const MediaItem = ({ title, duration, thumbnail, src, url, inQueue, added_by, nsfw, status, action = () => {}, position, context = {}, at, style }) => {

  const dispatch = useDispatch();

  const [thumbnailError, toggleThumbnailError] = React.useState(false);


  const play = (e) => {
    e.stopPropagation();

    dispatch(expandVideo(context));
  }

  return (
    <>
  
      <div
      style={style}
      onClick={() => action(context)}
      id={src}
      data-context={JSON.stringify({ ...context, inQueue })}
      className={`${styles.mediaItem} ${status ? styles.playing : ''}`}
    >
     
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          {position >= 0 && <div className={styles.queueIndication}>{position + 1}</div>}
          <div className={styles.thumbnail}>
           {thumbnail && !thumbnailError ? (
                <img src={thumbnail} alt="" className={styles.thumbnail} onError={() => toggleThumbnailError(true)} />
              ) : (
                <div className={styles.fallbackIcon}><Music2 size={20} /></div>
              )}
              <div className={styles.playOverlay}>
                <IconButton 
                Icon={<Play fill='var(--text-color)' color='var(--text-color)' />}
                title={'Play'}
                onClick={play}
                />
              </div>
          </div>
          
        </div>

        <div className={styles.details}>
          <div className={styles.title}>{title}</div>
          <div className={styles.detailsWrapper}>
            <Subtitle>{formatDuration(Math.floor(duration))}</Subtitle>
            {nsfw && (<TextIndicator backgroundColor='var(--error-color)' title='18+' />)}
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
        <UserIndicator label={'added by:'} user_id={added_by} date={at} marginLeft={typeof position === 'number' ? 52 : 24} />
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
