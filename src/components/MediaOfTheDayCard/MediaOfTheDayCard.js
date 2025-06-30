import React from 'react';

import { Image, Video, Camera, Clock } from 'lucide-react';

import styles from './MediaOfTheDayCard.module.css';

import { NsfwWrapper } from '../ui/Wrappers/NsfwWrapper/NsfwWrapper';

import { MediaTitle } from '../ui/Titles/MediaTitle/MediaTitle';
import { ImageComponent } from '../ui/Image/Image';
import { ImageTooltipWrapper } from '../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper';
import { LongPressGestureWrapper } from '../ui/Gestures/LongPressGestureWrapper';
import { getTimeUntil24Hours, triggerContext } from '../../lib/services/helperFunctions';
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../features/Media/ExpandedImage/expandedImageSlice';
import { setOverlay } from '../../features/Overlay/overlaySlice';
import { Subtitle } from '../ui/Titles/Subtitle/Subtitle';
import { expandVideo } from '../../features/Media/ExpandedVideo/expandedVideoSlice';
import VideoThumbnail from '../ui/Video/VideoThumbnail/VideoThumbnail';

const MediaOfTheDayCard = ({ title = "Media of the day", query, tags = "", src, type = 'image', date, media = {}}) => {

  const dispatch = useDispatch();

  const [untilUpdate, setUntilUpdate] = React.useState("");

  const [source, setSource] = React.useState({});
  
  const Icon = type === 'video' ? Video : type === 'camera' ? Camera : Image;

  React.useEffect(() => {

    if (date) {
      setUntilUpdate(getTimeUntil24Hours(date));
    }

  }, [date])

  React.useEffect(() => {

    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)/i;

    if (imageExtensions.test(query)) {
      setSource({type: "image", src: query})
    } else {
      setSource({type: "query", src: query})
    }

  }, [query]);

  const openSource = () => {
    if (type === 'image') {
      dispatch(setExpandedImage({image: source?.src}));

      dispatch(setOverlay("expandImage"));
    } else if (type === 'video') {

      dispatch(setOverlay('expandVideo'));

      dispatch(expandVideo(media))
    }
   
  } 


  return (
    <div data-context={JSON.stringify(media)} className={styles.mediaCard}>
      <div className={styles.mediaContent}>
        <NsfwWrapper nsfw={media} >
        {type === 'video' ? (
          <VideoThumbnail width="100%" maxWidth="100%" {...media} action={openSource} />
        ) : (
          <LongPressGestureWrapper width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, src)}}>
            <ImageTooltipWrapper image={{src, type}}>
              <ImageComponent objectFit='contain' src={src} alt={title} />
            </ImageTooltipWrapper>
          </LongPressGestureWrapper>
        )}
        </NsfwWrapper>
        <MediaTitle icon={Icon} title={title} />
      </div>
      <div className={styles.mediaFooter}>
        <div className={styles.mediaQuery}>
          Media found related to: {
          source.type === 'image' ?
          <span onClick={openSource}>source</span>
          :
          <strong>{query}</strong>
          }
        </div>
        <div className={styles.updatesIn}><Clock strokeWidth={3} color='var(--text-color)' size={15} /><Subtitle> updates in: {untilUpdate}</Subtitle></div>
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
