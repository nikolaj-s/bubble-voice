import React from 'react';

import styles from './ChannelStatus.module.css'
import { MediaItem } from '../../../../MediaPlayer/MediaItem/MediaItem';
import { LineSpacer } from '../../../Spacers/LineSpacer/LineSpacer';
import { useDispatch, useSelector } from 'react-redux';
import { expandVideo } from '../../../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { setOverlay } from '../../../../../features/Overlay/overlaySlice';

export const ChannelStatus = ({channel = {}, active}) => {

    const dispatch = useDispatch();

    const status = channel.status;

    const {currentlyPlaying, currentTime} = useSelector(state => state.mediaPlayerSlice);

    const handleOpenMedia = () => {
        
        if (active) return dispatch(setOverlay('mediaPlayer'));

        if (status.type === 'video') {
            dispatch(expandVideo(status));

            dispatch(setOverlay('expandVideo'))
        }
    }

    if (!status) return null;

    return (
        <div className={styles.status}>
            {status.type === 'video' ?
            <MediaItem action={handleOpenMedia} {...status} status={true} duration={active ? Math.floor(currentTime) : status.duration} />
            : 
            null
            }
            <LineSpacer />
        </div>
    )
}
