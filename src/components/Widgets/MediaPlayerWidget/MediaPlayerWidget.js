import React from 'react';
import styles from './MediaPlayerWidget.module.css';
import { FolderSearch, Bookmark, ImageOff, Play } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { MediaItem } from '../../MediaPlayer/MediaItem/MediaItem';
import ContentPlaceholder from '../../ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { expandVideo } from '../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { addMediaToPlayer } from '../../../features/MediaPlayer/Thunks/addMediaToPlayer';
import { setChannelToViewWidgetsOf } from '../../../features/Widgets/widgetsSlice';
import ContentHeader from '../../Headers/ContentHeader/ContentHeader';
import { ToolBar } from '../../ui/Wrappers/ToolBar/ToolBar';

export const MediaPlayerWidget = ({ channel_id, saves = [] }) => {

  const dispatch = useDispatch();

  const channel = useSelector(
    state => state.channelsSlice.channels[channel_id]
  ) || {};

  const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

  const goTo = overlayName => {
    if (overlayName === 'mediaPlayerSaves') dispatch(setChannelToViewWidgetsOf(channel_id));
    dispatch(setOverlay(overlayName))
  };

  const openMediaItem = (mediaItem) => {

    if (currentVoiceChannel) {
      dispatch(addMediaToPlayer(mediaItem));
      dispatch(setOverlay('mediaPlayer'));
    } else {
      dispatch(expandVideo(mediaItem));
    }
  }

  return (
    <div className={styles.wrapper}>
      <ContentHeader Icon={Play} title={`Saved Media From ${channel.channel_name}`} />
      <div className={styles.list}>
        {saves.length > 0 ? (
          saves.map(save => (
            <MediaItem key={save._id} {...save} context={save} action={openMediaItem} />
          ))
        ) : (
          <ContentPlaceholder icon={ImageOff} title={'No Saved Media'} />
        )}
      </div>

      <ToolBar>
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
      </ToolBar>

      <div className={styles.bubbleBackground}>
        <span className={`${styles.bubble} ${styles.b1}`} />
        <span className={`${styles.bubble} ${styles.b2}`} />
        <span className={`${styles.bubble} ${styles.b3}`} />
      </div>
    </div>

  );
};
