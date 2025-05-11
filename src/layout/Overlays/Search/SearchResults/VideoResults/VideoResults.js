import React from 'react';

import styles from './VideoResults.module.css'
import { VideoPreview } from '../../../../../components/ui/Video/VideoPreview/VideoPreview';
import { useDispatch } from 'react-redux';
import { expandVideo } from '../../../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { setOverlay } from '../../../../../features/Overlay/overlaySlice';

export const VideoResults = ({results = []}) => {
   
    const dispatch = useDispatch();

    const handleExpandVideo = (video) => {
        dispatch(expandVideo(video));

        dispatch(setOverlay('expandVideo'));
    }

    return (
        <div className={styles.container}>
            {results.map((video, index) => (
                <VideoPreview action={handleExpandVideo} {...video} key={video.src + index} />
            ))}
        </div>
    )
}
