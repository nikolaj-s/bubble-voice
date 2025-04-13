import React from 'react';

import { Image, Video, Camera, Clock } from 'lucide-react';

import styles from './MediaOfTheDayCard.module.css';

import { NsfwWrapper } from '../ui/Wrappers/NsfwWrapper/NsfwWrapper';

import { MediaTitle } from '../ui/Titles/MediaTitle/MediaTitle';
import { ImageComponent } from '../ui/Image/Image';
import { ImageTooltipWrapper } from '../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper';
import { LongPressGestureWrapper } from '../ui/Gestures/LongPressGestureWrapper';
import { getTimeUntil24Hours, triggerContext } from '../../lib/services/helperFunctions';

const MediaOfTheDayCard = ({ title = "Media of the day", query, tags = "", src, type = 'image', date, media = {}}) => {

  const [untilUpdate, setUntilUpdate] = React.useState("");
  
  const Icon = type === 'video' ? Video : type === 'camera' ? Camera : Image;

  React.useEffect(() => {

    if (date) {
      setUntilUpdate(getTimeUntil24Hours(date));
    }

  }, [date])

  return (
    <div data-context={JSON.stringify({src, tags, query, type})} className={styles.mediaCard}>
      <div className={styles.mediaContent}>
        <NsfwWrapper nsfw={media} >
        {type === 'video' ? (
          <video src={src} autoPlay loop muted className={styles.media} />
        ) : (
          <LongPressGestureWrapper width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, src)}}>
            <ImageTooltipWrapper image={{src, type}}>
              <ImageComponent src={src} alt={title} />
            </ImageTooltipWrapper>
          </LongPressGestureWrapper>
        )}
        </NsfwWrapper>
        <MediaTitle icon={Icon} title={title} />
      </div>
      <div className={styles.mediaFooter}>
        <div className={styles.mediaQuery}>
          Media found related to "<strong>{query}</strong>"
        </div>
        <div className={styles.updatesIn}><Clock strokeWidth={3} color='var(--text-color)' size={15} /> updates in: {untilUpdate}</div>
        <div className={styles.mediaTags}>
          {tags?.split(" ").slice(0, 3).map((tag, idx) => (
            <span className={styles.mediaTag} key={idx}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaOfTheDayCard;
