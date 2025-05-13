import React from 'react';

import { Bookmark } from 'lucide-react';

import { MediaItem } from '../MediaItem/MediaItem'; // Your existing media component

import styles from './SavedMedia.module.css';

const SavedMedia = ({ media = [], savedItemAction = () => {} }) => {

    const hasMedia = media && media.length > 0;

    return (
        <div id='media-player-widget-saves' className={styles.container}>
            <div className={styles.header}>
                <Bookmark className={styles.icon} size={20} />
                <span className={styles.title}>Saved Media</span>
            </div>

            {hasMedia ? (
                <div className={styles.grid}>
                {media.map((item, index) => (
                    <MediaItem action={savedItemAction} key={index} {...item} context={item} />
                ))}
                </div>
            ) : (
                <div className={styles.placeholder}>
                <Bookmark size={32} className={styles.placeholderIcon} />
                <p className={styles.placeholderText}>No saved media yet. Go tag something worth keeping!</p>
                </div>
            )}
        </div>
    );
};

export default SavedMedia;
