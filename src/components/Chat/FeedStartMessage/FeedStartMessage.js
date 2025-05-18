import React from 'react';
import { Hash, Pencil } from 'lucide-react';
import styles from './FeedStartMessage.module.css';
import { IconPlaceholder } from '../../ui/Placeholders/IconPlaceholder/IconPlaceholder';

/**
 * @param {Object} props
 * @param {string} props.channelName - The name of the channel
 * @param {function} [props.editChannel] - Optional function to trigger editing the channel
 */
const FeedStartMessage = ({ channelName = "this channel", editChannel }) => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.bubbleBackdrop}>
            <div className={styles.bubble} />
            <div className={styles.bubble} />
        </div>
        <IconPlaceholder icon={Hash} />
        <h2 className={styles.title}>
            Welcome to <span className={styles.channel}>#{channelName}</span>
        </h2>

        <p className={styles.message}>
            This is the beginning of the feed — start floating thoughts, sharing media, or just say hi! ☁️
        </p>

        {editChannel && (
            <button className={styles.editButton} onClick={editChannel}>
            <Pencil size={16} /> Edit Channel
            </button>
        )}
    </div>
  );
};

export default FeedStartMessage;
