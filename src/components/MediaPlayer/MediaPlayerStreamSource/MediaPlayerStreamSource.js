import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import ReactPlayer from 'react-player';

import { incrementCurrentTime, setMediaHasAudio, toggleIsMediaPlayerOpen } from '../../../features/Channel/MediaPlayer/mediaPlayerSlice';

import SpinnerLoading from '../../ui/Loading/Spinner/SpinnerLoading';

import ErrorCard from '../../Error/ErrorCard/ErrorCard';

import { BoxLabel } from '../../ui/Titles/BoxLabel/BoxLabel';

import DoubleTapWrapper from '../../ui/Wrappers/DoubleTapWrapper/DoubleTapWrapper';

import RedditAudioSrc from '../../RedditAudioSrc/RedditAudioSrc';

import PlayPauseFlash from '../../ui/PlayPauseFlash/PlayPauseFlash';

import { LongPressGestureWrapper } from '../../ui/Gestures/LongPressGestureWrapper';

import { triggerContext } from '../../../lib/services/helperFunctions';

import styles from './MediaPlayerStreamSource.module.css';
import TextLabelError from '../../Error/TextLabelError/TextLabelError';

export const MediaPlayerStreamSource = ({expand}) => {

    const dispatch = useDispatch();

    const playerRef = React.useRef();

    const [localTime, setLocalTime] = React.useState(0);

    const hasSeekedInitially = React.useRef(false);

    const {currentlyPlaying, currentTime, isPlaying, volume, loading, error, isMuted, hasAudio, hideMediaPlayer} = useSelector(state => state.mediaPlayerSlice);

    const handleProgress = (value) => {

        setLocalTime(value);

        dispatch(incrementCurrentTime(value.playedSeconds));
    }

    React.useEffect(() => {
        if (!playerRef.current) return;
    
        const current = playerRef.current.getCurrentTime();
        
        // prevent redundant seeks and feedback loops
        if (!hasSeekedInitially.current || Math.abs(currentTime - current) > 0.5) {
            playerRef.current.seekTo(currentTime, 'seconds');
            hasSeekedInitially.current = true;
        }
      }, [currentTime]);
      

    if (!currentlyPlaying) return null;

    return (
        <div data-context={JSON.stringify({...currentlyPlaying, type: 'mediaplayer' })} style={{display: hideMediaPlayer ? 'none' : null}} hidden={hideMediaPlayer} id='media-player-stream-source' onClick={() => {expand('media-player-stream-source')}} className={styles.container}>
            <LongPressGestureWrapper width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, 'media-player-stream-source')}}>
                <DoubleTapWrapper onDoubleTap={() => {dispatch(toggleIsMediaPlayerOpen(true))}}>
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
                    <div className={styles.overlay}  >
                        {error && (<TextLabelError error={error} />)}
                    </div>
                    {loading && (<SpinnerLoading />)}
                    {!hasAudio && (
                    <div className={styles.noAudio}>
                        <BoxLabel label={'no audio'} />
                    </div>
                    )}
                    <RedditAudioSrc 
                    url={currentlyPlaying?.src} currentTime={currentTime} 
                    isPlaying={isPlaying} volume={volume} 
                    muted={isMuted} hasAudioFunction={() => {dispatch(setMediaHasAudio(true))}} 
                    
                    />
                    <PlayPauseFlash isPlaying={isPlaying} />
                </DoubleTapWrapper>
            </LongPressGestureWrapper>
        </div>
    )
}
