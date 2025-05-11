import React from 'react';

import styles from './VideoResults.module.css'
import { VideoPreview } from '../../../../../components/ui/Video/VideoPreview/VideoPreview';
import { useDispatch } from 'react-redux';
import { expandVideo } from '../../../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { setOverlay } from '../../../../../features/Overlay/overlaySlice';
import { LongPressGestureWrapper } from '../../../../../components/ui/Gestures/LongPressGestureWrapper';
import { triggerContext } from '../../../../../lib/services/helperFunctions';

export const VideoResults = ({results = []}) => {
   
    const dispatch = useDispatch();

    const handleExpandVideo = (video) => {
        dispatch(expandVideo(video));

        dispatch(setOverlay('expandVideo'));
    }

    return (
        <div className={styles.container}>
            {results.map((video, index) => (
                <div key={video.src + index} style={{
                    width: '100%',
                    maxWidth: 350,
                    display: 'flex'
                }}>
                <LongPressGestureWrapper display={'flex'} width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, video.src)}} >
                    <VideoPreview action={handleExpandVideo} {...video}  />
                </LongPressGestureWrapper>
                </div>
            ))}
        </div>
    )
}
