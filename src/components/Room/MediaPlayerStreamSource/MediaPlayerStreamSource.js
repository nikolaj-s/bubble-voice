import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from './MediaPlayerStreamSource.module.css';
import ReactPlayer from 'react-player';
import { incrementCurrentTime } from '../../../features/Channel/MediaPlayer/mediaPlayerSlice';
import SpinnerLoading from '../../ui/Loading/Spinner/SpinnerLoading';
import ErrorCard from '../../Error/ErrorCard/ErrorCard';

export const MediaPlayerStreamSource = ({expand}) => {

    const dispatch = useDispatch();

    const playerRef = React.useRef();

    const [localTime, setLocalTime] = React.useState(0);

    const {currentlyPlaying, currentTime, isPlaying, volume, loading, error, isMuted} = useSelector(state => state.mediaPlayerSlice);

    const handleProgress = (value) => {

        setLocalTime(value);

        dispatch(incrementCurrentTime(value.playedSeconds));
    }

    React.useEffect(() => {

        if (playerRef.current) {
            
            const current = playerRef.current.getCurrentTime();

            if (Math.abs(currentTime - current) > 0.5) {
            playerRef.current.seekTo(currentTime, 'seconds');
            }

        }
    }, [currentTime])

    if (!currentlyPlaying) return null;

    return (
        <div id='media-player-stream-source' onClick={() => {expand('media-player-stream-source')}} className={styles.container}>
            <ReactPlayer 
            ref={playerRef}
            controls={false}
            playsinline
            autoPlay
            volume={volume}
            onProgress={handleProgress}
            width={'100%'}
            height={'100%'}
            url={currentlyPlaying?.src || currentlyPlaying?.url}
            playing={isPlaying}
            muted={isMuted}
            />
            <div className={styles.overlay} data-context={JSON.stringify({type: 'mediaplayer'})} >
                {error && (<ErrorCard message={error} />)}
            </div>
            {loading && (<SpinnerLoading />)}
        </div>
    )
}
