import React from 'react';
import styles from './MediaPlayerWidget.module.css';
import { FolderSearch, Bookmark, ImageOff } from 'lucide-react';
import { LineSpacer } from '../../ui/Spacers/LineSpacer/LineSpacer';
import Header from '../../ui/Titles/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { MediaItem } from '../../MediaPlayer/MediaItem/MediaItem';
import ContentPlaceholder from '../../ui/Placeholders/ContentPlaceholder/ContentPlaceholder';

export const MediaPlayerWidget = ({ channel_id, saves = [] }) => {
  const dispatch = useDispatch();
  const channel = useSelector(
    state => state.channelsSlice.channels[channel_id]
  ) || {};

  const goTo = overlayName => dispatch(setOverlay(overlayName));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header level={3} text={`Saved Media From ${channel.channel_name || '…'}`} />
        <LineSpacer margin="0 0 8px 0" />
      </div>

      <div className={styles.list}>
        {saves.length > 0 ? (
          saves.map(save => (
            <MediaItem key={save._id} {...save} context={save} />
          ))
        ) : (
          <ContentPlaceholder icon={ImageOff} title={'No Saved Media'} />
        )}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.actionButton}
          onClick={() => goTo('mediaPlayerSaves')}
        >
          <Bookmark size={20} />
          <span>View All Saves</span>
        </button>
        <button
          className={styles.actionButton}
          onClick={() => goTo('search')}
        >
          <FolderSearch size={20} />
          <span>Discover</span>
        </button>
      </div>

      <div className={styles.bubbleBackground}>
        <span className={`${styles.bubble} ${styles.b1}`} />
        <span className={`${styles.bubble} ${styles.b2}`} />
        <span className={`${styles.bubble} ${styles.b3}`} />
      </div>
    </div>
  );
};
