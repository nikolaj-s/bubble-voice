
import { ToolBar } from '../../../ui/Wrappers/ToolBar/ToolBar';

import { useDispatch, useSelector } from 'react-redux';

import styles from './MediaPlayerRoomStatus.module.css';
import { MediaItem } from '../../../MediaPlayer/MediaItem/MediaItem';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const MediaPlayerRoomStatus = () => {

    const dispatch = useDispatch();

    const currentlyPlaying = useSelector(state => state.mediaPlayerSlice.currentlyPlaying);

    const enabled = useSelector(state => state.mediaPlayerSlice.enabled);

    const color = useSelector(state => state.mediaPlayerSlice.color);

    const hide = useSelector(state => state.mediaPlayerSlice.hideMediaPlayerRoomStatus)

    const openOverlay = () => {
        dispatch(setOverlay("mediaPlayer"));
    }

    if (!enabled || !currentlyPlaying || hide) return null;

    return (
        <ToolBar className={`${styles.container}`} style={{backgroundColor: color}} data-context={JSON.stringify({type: 'mediaplayer'})}>
            <div key={currentlyPlaying?.src} className={styles.currentlyPlaying}>
                <MediaItem action={openOverlay} {...currentlyPlaying} />
            </div>
        </ToolBar>
    )
}
