
import styles from './VideoResults.module.css'
import { VideoPreview } from '../../../../../components/ui/Video/VideoPreview/VideoPreview';
import { useDispatch, useSelector } from 'react-redux';
import { expandVideo } from '../../../../../features/Media/ExpandedVideo/expandedVideoSlice';
import { setOverlay } from '../../../../../features/Overlay/overlaySlice';
import { LongPressGestureWrapper } from '../../../../../components/ui/Gestures/LongPressGestureWrapper';
import { triggerContext } from '../../../../../lib/services/helperFunctions';
import { useCallback } from 'react';
import { addMediaToPlayer } from '../../../../../features/MediaPlayer/Thunks/addMediaToPlayer';

export const VideoResults = ({results = []}) => {

    const enabled = useSelector(state => state.mediaPlayerSlice.enabled);

    const {addToMediaPlayerOnClick} = useSelector(state => state.searchSettingsSlice);
   
    const dispatch = useDispatch();

    const handleExpandVideo = useCallback((video) => {
        console.log(video)

        if (enabled && addToMediaPlayerOnClick && video.duration) {

            dispatch(addMediaToPlayer(video));

            dispatch(setOverlay('mediaPlayer'));

        } else {

            dispatch(expandVideo(video));

        }

    }, [enabled, dispatch, addToMediaPlayerOnClick])

    return (
        <div className={styles.container}>
            {results.map((video, index) => (
                <div key={index} style={{
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
