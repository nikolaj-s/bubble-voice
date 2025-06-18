
import { MediaItem } from '../MediaItem/MediaItem';

import styles from './MediaPlayerQueue.module.css';
import { VerticalReorderWrapper } from '../../ui/Wrappers/VerticalReorderWrapper/VerticalReorderWrapper';
import ContentPlaceholder from '../../ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { ListX } from 'lucide-react';

export const MediaPlayerQueue = ({queue, onReorder = () => {}}) => {
    return (
         <div className={styles.queue}>
            
            {queue.length > 0 ? (
            <VerticalReorderWrapper items={queue} onReorder={onReorder} >
                {queue.slice().map((media, index) => (
                    <MediaItem key={index} position={queue.findIndex(m => m._id === media._id)} {...media} inQueue={true} context={media} />
                ))}
            </VerticalReorderWrapper>
            ) : (
            <ContentPlaceholder title={'No Media In The Queue'} icon={ListX} />
            )}
        </div>
    )
}
