
import styles from './VideoPreview.module.css';
import { Ellipsis, Play } from 'lucide-react';
import { ImageComponent } from '../../Image/Image';
import IconButton from '../../Buttons/IconButton/IconButton';
import { triggerContext } from '../../../../lib/services/helperFunctions';
import { TextIndicator } from '../../TextIndicator/TextIndicator';
import { useDispatch } from 'react-redux';
import { expandVideo } from '../../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { Description } from '../../Description/Description';

export const VideoPreview = ({ title, src, thumbnail, query, tags, nsfw, width, height, duration, snippet, url, action }) => {

  const dispatch = useDispatch();

  const handleAction = (data) => {

    if (typeof action !== 'function') return dispatch(expandVideo(data));

    action(data);

  }

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSiteName = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '').split('.')[0];
    } catch {
      return '';
    }
  };

  const siteName = getSiteName(url);

  return (
    <div 
    id={src}
    data-context={JSON.stringify({title, src, thumbnail, url, query, tags, nsfw, width, height, duration, type: 'video'})}
    onClick={() => {handleAction({title, src, thumbnail, tags, nsfw, url, duration})}} className={styles.card}>
      <div className={styles.contextButton}>
        <IconButton
        Icon={<Ellipsis color='var(--text-color)' />}
        onClick={(e) => {triggerContext(e, src)}}
        title={'More'}
        position='bottom'
        />
      </div>
      <div className={styles.thumbnailWrapper}>
        <ImageComponent src={thumbnail} />
        <div className={styles.overlay}>
          <Play className={styles.playIcon} />
          <span className={styles.duration}>{formatDuration(duration)}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h5 className={styles.title}>{title}</h5>
        <Description description={tags || snippet} />
        <div className={styles.meta}>
          <span className={styles.query}>{siteName}</span>
          {nsfw && <TextIndicator title='18+' backgroundColor='var(--error-color)' />}
        </div>
      </div>
    </div>
  );
};

