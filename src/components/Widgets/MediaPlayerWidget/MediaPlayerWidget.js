import React from 'react';
import styles from './MediaPlayerWidget.module.css';
import { FolderSearch, Bookmark } from 'lucide-react';
import { LineSpacer } from '../../ui/Spacers/LineSpacer/LineSpacer';
import Header from '../../ui/Titles/Header/Header';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../../features/Overlay/overlaySlice';

export const MediaPlayerWidget = () => {
  const dispatch = useDispatch();
  const goTo = (overlayName) => dispatch(setOverlay(overlayName));

  return (
    <div className={styles.wrapper}>
      <Header level={3} text="Media Player" />
      <LineSpacer margin="0 0 16px 0" />

      {/* Bubble background layer */}
      <div className={styles.bubbleBackground}>
        <div className={`${styles.bubble} ${styles.bubble1}`} />
        <div className={`${styles.bubble} ${styles.bubble2}`} />
        <div className={`${styles.bubble} ${styles.bubble3}`} />
        <div className={`${styles.bubble} ${styles.bubble4}`} />
      </div>

      <div className={styles.buttonRow}>
        <button
          className={styles.actionButton}
          onClick={() => goTo('mediaPlayerSaves')}
        >
          <Bookmark size={20} />
          <span>Saved</span>
        </button>
        <button
          className={styles.actionButton}
          onClick={() => goTo('search')}
        >
          <FolderSearch size={20} />
          <span>Discover</span>
        </button>
      </div>
    </div>
  );
};
