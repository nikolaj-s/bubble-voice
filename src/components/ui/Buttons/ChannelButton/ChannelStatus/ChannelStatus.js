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

    const {currentTime, color} = useSelector(state => state.mediaPlayerSlice);

    const handleOpenMedia = () => {
        
        if (active) return dispatch(setOverlay('mediaPlayer'));

        if (status.type === 'video') {
            dispatch(expandVideo(status));

            dispatch(setOverlay('expandVideo'))
        }
    }

    if (!status) return null;

    return (
        <>
        <div 
        style={{backgroundColor: color}}
        className={styles.status}>
            {status.type === 'video' ?
            <MediaItem 
            key={status?.src}
            context={{...status, type: active ? 'mediaplayer' : 'video'}}
            action={handleOpenMedia} 
            {...status} status={true} 
            duration={active ? Math.floor(currentTime) : status.duration} 
            />
            : 
            null
            }
           
        </div>
        </>
    )
}
