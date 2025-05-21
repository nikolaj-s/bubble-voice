import React from 'react'
import EmptyListPlaceholder from '../../ui/Placeholders/EmptyListPlaceholder/EmptyListPlaceholder'
import { MediaItem } from '../MediaItem/MediaItem';

import styles from './MediaPlayerQueue.module.css';

export const MediaPlayerQueue = ({queue}) => {
    return (
         <div className={styles.queue}>
            
            {queue.length > 0 ? (
            queue.slice().map((media, index) => (
                <MediaItem key={index} position={index} {...media} inQueue={true} context={media} />
            ))
            ) : (
            <EmptyListPlaceholder message='No Media In The Queue' />
            )}
        </div>
    )
}
