import React from 'react';

import { Bookmark } from 'lucide-react';

import { MediaItem } from '../MediaItem/MediaItem'; // Your existing media component

import styles from './SavedMedia.module.css';
import TextLabelError from '../../Error/TextLabelError/TextLabelError';
import SpinnerLoading from '../../ui/Loading/Spinner/SpinnerLoading';
import TextInput from '../../ui/Inputs/TextInput/TextInput';

const SavedMedia = ({ media = [], savedItemAction = () => {}, loading, error }) => {

    const [filter, setFilter] = React.useState("");

    const hasMedia = media && media.length > 0;

    return (
        <div id='media-player-widget-saves' className={styles.container}>
            <div className={styles.header}>
                <Bookmark className={styles.icon} size={20} />
                <span className={styles.title}>Saved Media</span>
            </div>
            <TextInput onChange={setFilter} value={filter} placeholder={'Filter'} />
            {error && (<TextLabelError error={error} />)}
            {hasMedia ? (
                <div className={styles.grid}>
                
                {media.filter(media => media.title.toLowerCase().includes(filter.toLowerCase())).map((item, index) => (
                    <MediaItem position={index} action={savedItemAction} key={index} {...item} context={item} />
                ))}
                </div>
            ) : (
                <div className={styles.placeholder}>
                <Bookmark size={32} className={styles.placeholderIcon} />
                <p className={styles.placeholderText}>No saved media yet. Go tag something worth keeping!</p>
                </div>
            )}
            {loading && <SpinnerLoading />}
        </div>
    );
};

export default SavedMedia;
