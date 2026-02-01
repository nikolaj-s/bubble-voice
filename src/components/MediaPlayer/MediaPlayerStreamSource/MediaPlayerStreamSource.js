import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import ReactPlayer from 'react-player';

import { incrementCurrentTime, setMediaHasAudio, setMediaMuted, toggleIsMediaPlayerOpen } from '../../../features/MediaPlayer/mediaPlayerSlice';

import SpinnerLoading from '../../ui/Loading/Spinner/SpinnerLoading';

import { BoxLabel } from '../../ui/Titles/BoxLabel/BoxLabel';

import DoubleTapWrapper from '../../ui/Wrappers/DoubleTapWrapper/DoubleTapWrapper';

import PlayPauseFlash from '../../ui/PlayPauseFlash/PlayPauseFlash';

import { LongPressGestureWrapper } from '../../ui/Gestures/LongPressGestureWrapper';

import { triggerContext } from '../../../lib/services/helperFunctions';

import TextLabelError from '../../Error/TextLabelError/TextLabelError';

import styles from './MediaPlayerStreamSource.module.css';
import StreamOverlay from '../../ui/StreamOverlay/StreamOverlay';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Ellipsis } from 'lucide-react';
import { useBlockGlobalPlayPauseKeys } from '../../../hooks/useBlockGlobalPlayPauseKeys';

export const MediaPlayerStreamSource = ({expand, expanded}) => {

    const dispatch = useDispatch();

    const playerRef = React.useRef();

    const [aspectRatio, setAspectRatio] = React.useState(null);

    const [src, setSrc] = React.useState(null);

    // eslint-disable-next-line
    const [localTime, setLocalTime] = React.useState(0);

    const hasSeekedInitially = React.useRef(false);

    const isMobileRef = React.useRef();

    const users = useSelector(state => state.serverUsersSlice.users);

    const {currentlyPlaying, currentTime, isPlaying, volume, loading, error, isMuted, hasAudio, hideMediaPlayer, color} = useSelector(state => state.mediaPlayerSlice);

    React.useEffect(() => {

        setSrc(null);

        // const fetchDirectSrc = async (url) => {

        //     let res = await window?.electron?.ipcRenderer?.invoke('FETCH_YOUTUBE_STREAM_URL', currentlyPlaying.url);

        //     if (res.error) return setSrc(url);

        //     setSrc(res);

        // }

        if (!currentlyPlaying) return setSrc(null);

        // if (window?.electron && currentlyPlaying?.url?.includes('youtu')) {

        //     fetchDirectSrc();

        // } else 
        
        if (currentlyPlaying?.url?.includes('youtu') || currentlyPlaying?.url?.includes('vimeo')) {
            
            setSrc(currentlyPlaying?.url);

        } else {

            setSrc(currentlyPlaying?.src);
        }

    }, [currentlyPlaying])

    React.useEffect(() => {

        isMobileRef.current = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobileRef.current && !isMuted) {
            dispatch(setMediaMuted(true));
        }

    }, []);

    const handleProgress = (value) => {

        setLocalTime(value);

        dispatch(incrementCurrentTime(value.playedSeconds));
    }

    const checkVideoAspectRatio = () => {
      const container = playerRef.current?.getInternalPlayer ? playerRef.current.getInternalPlayer() : null;
      if (container && container.videoWidth && container.videoHeight) {
        setAspectRatio(container.videoWidth / container.videoHeight);
      } else {
        setAspectRatio(16 /9)
      }
    };
    
    React.useEffect(() => {
        if (!playerRef.current) return;
    
        const current = playerRef.current.getCurrentTime();
        
        // prevent redundant seeks and feedback loops
        if (!hasSeekedInitially.current || Math.abs(currentTime - current) > 0.5) {
            playerRef.current.seekTo(currentTime, 'seconds');
            hasSeekedInitially.current = true;
        }
    }, [currentTime]);

    useBlockGlobalPlayPauseKeys();

    const handleUnmute = () => {
        dispatch(setMediaMuted(false))
    }

    if (!currentlyPlaying && !expanded) return null;

    return (
        <div 
        data-context={JSON.stringify({...currentlyPlaying, type: 'mediaplayer', aspectRatio})} 
        style={{display: hideMediaPlayer ? 'none' : null}} 
        hidden={hideMediaPlayer} id='media-player-stream-source' onClick={() => {expand('media-player-stream-source')}} className={styles.container}>
            <LongPressGestureWrapper width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, 'media-player-stream-source')}}>
                <DoubleTapWrapper onDoubleTap={() => {dispatch(toggleIsMediaPlayerOpen(true))}}>
                    <ReactPlayer 
                    ref={playerRef}
                    controls={false}
                    playsinline
                    autoPlay
                    volume={volume}
                    onProgress={handleProgress}
                    onReady={checkVideoAspectRatio}
                    width={'100%'}
                    height={'100%'}
                    url={src}
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
                    <PlayPauseFlash isPlaying={isPlaying} />
                </DoubleTapWrapper>
            </LongPressGestureWrapper>
            <StreamOverlay altName={`added by: ${users[currentlyPlaying?.added_by]?.display_name}`} name={currentlyPlaying?.title || "Media Player"}
            button={
                <IconButton 
                Icon={<Ellipsis color='var(--text-color)' />}
                title={'More'}
                position='bottom'
                onClick={(e) => {triggerContext(e, 'media-player-stream-source')}}
                />
            }
            />
            {/* Tap to unmute overlay — mobile only */}
            {isMobileRef.current && isMuted && (
                <div className={styles.tapToUnmuteOverlay} onClick={handleUnmute}>
                🔈 Tap to Unmute
                </div>
            )}
        </div>
    )
}
