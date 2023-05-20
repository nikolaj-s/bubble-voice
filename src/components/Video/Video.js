// library's

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAutoPlayNativeVideos, selectMuteSocialVideos, selectVideoVolume, setVideoVolume } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { ExpandButton } from '../buttons/ExpandButton/ExpandButton';
import { AudioToggleButton } from '../buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { PauseButton } from '../buttons/PauseButton/PauseButton';
import { PlayButton } from '../buttons/PlayButton/PlayButton';
import { useIntersection } from '../useIntersection/useIntersection';
import { motion, useAnimation } from 'framer-motion';
import {Range} from '../inputs/Range/Range';
// style's
import "./Video.css";
import { VideoPlayOverlayAnimation } from './VideoPlayOverlayAnimation/VideoPlayOverlayAnimation';

export const Video = ({ video, id, looping = false, objectFit = 'contain', height = "100%", mutedToggled, marginLeft, audio}) => {

    const ref = React.useRef();

    const visible = useIntersection(ref, '-400px');

    const [muted, toggleMuted] = React.useState(true);
    
    const [playing, togglePlaying] = React.useState(false);

    const [interacted, toggleInteracted] = React.useState(false);

    const [progress, setProgress] = React.useState(0);

    const [volumeSlider, toggleVolumeSlider] = React.useState(false);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const videoVolume = useSelector(selectVideoVolume);

    const accentColor = useSelector(selectAccentColor);

    const color = useSelector(selectTextColor);

    const social_autoplay = useSelector(selectAutoPlayNativeVideos);

    const social_mute = useSelector(selectMuteSocialVideos);

    const controlAnimation = useAnimation();

    let mouseMoveTimeOut;

    const dispatch = useDispatch();

    const handlePlayState = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (playing) {
            document.getElementById(video + id).pause();
            document.getElementById(video + 'audio').pause();
        } else {
            document.getElementById(video + id).play();
            document.getElementById(video + 'audio').play();
        }

        document.getElementById(video + id).volume = videoVolume;

        document.getElementById(video + 'audio').volume = videoVolume;

        togglePlaying(!playing);

        toggleInteracted(true);
    }

    const handleMuteState = (e) => {
        e.stopPropagation();
        if (muted) {
            document.getElementById(video + id).muted = true;
            document.getElementById(video + 'audio').muted = true;
        } else {
            document.getElementById(video + id).muted = false;
            document.getElementById(video + 'audio').muted = false;
        }

        toggleMuted(!muted)
    }

    const onVideoEnd = () => {
        if (looping) return;
        togglePlaying(false);
        toggleInteracted(false);
    }

    const expand = (e) => {
        e.stopPropagation();
        dispatch(setExpandedContent(video))
    }

    const showControls = (enter) => {

        controlAnimation.start({opacity: 1})

        if (enter === false) {

            controlAnimation.start({opacity: 0});

            if (!playing) toggleInteracted(false);
        } 
        
    }

    const handleProgress = (e) => {
        setProgress((e.target.currentTime / e.target.duration) * 100)
    }

    const scrub = (e) => {
        e.stopPropagation();

        const v = document.getElementById(video + id);

        const a = document.getElementById(video + 'audio');
        
        const time = (e.nativeEvent.offsetX / e.target.offsetWidth) * v.duration;

        v.currentTime = time;

        a.currentTime = time;
    }

    React.useEffect(() => {

        if (visible && social_autoplay) {
            togglePlaying(true);

            toggleInteracted(true);

            document.getElementById(video + id).play();

            document.getElementById(video + 'audio').play();

            mouseMoveTimeOut = setTimeout(() => {

                controlAnimation.start({opacity: 0});
    
            }, 2000)

            document.getElementById(video + id).volume = videoVolume;

            document.getElementById(video + 'audio').volume = videoVolume;
        } else {
            togglePlaying(false);

            toggleInteracted(false);

            document.getElementById(video + id).pause();

            document.getElementById(video + 'audio').pause();
        }

    }, [visible])

    React.useEffect(() => {

        if (social_mute) {
            document.getElementById(video + id).muted = true;
            document.getElementById(video + 'audio').muted = true;
            toggleMuted(false);
        }

    }, [social_mute])

    const handleVolumeChange = (value) => {
        dispatch(setVideoVolume(value));

        document.getElementById(video + id).volume = value;

        document.getElementById(video + 'audio').volume = value;
    }

    return (
        <div 
        style={{
            height: height,
            objectFit: objectFit,
            marginLeft: marginLeft
        }}
        onClick={handlePlayState}
        className='message-video-container'>
            <video 
            onTimeUpdate={handleProgress}
            onMouseMove={() => {showControls(true)}}
            ref={ref}
            onMouseLeave={() => {showControls(false)}}
            loading="lazy"
            style={{objectFit: objectFit}}
            muted={mutedToggled ? true : false}
            onEnded={onVideoEnd} autoPlay={looping ? true : false} id={video + id} controls={false} loop={true} 
            src={video}
            />
            <audio hidden={true} muted={mutedToggled ? true : false} loop={true} src={video?.includes('v.redd') ? video?.split('_')[0] + '_audio.mp4' : null} autoPlay={looping ? true : false} id={video + 'audio'} />
            <VideoPlayOverlayAnimation interacted={interacted} color={color} playing={playing} />
            {(looping || !interacted) ? null :
            <motion.div 
            animate={controlAnimation}
            transition={{duration: 0.01}}
            onMouseMove={() => {showControls(true)}}
            className='message-video-controls-container'>
                <div className='inner-video-controls-container'>
                    {playing ?
                    <PauseButton  width={15} height={15} action={handlePlayState} />
                    :
                    <PlayButton width={15} height={15} action={handlePlayState} />
                    }
                    <AudioToggleButton  width={15} height={15} description={!muted ? 'un-mute' : 'mute'} action={handleMuteState} state={muted} />
                    <div className='video-volume-slider'>
                        <Range action={handleVolumeChange} value={videoVolume} min={0} max={1} step={0.01} />
                    </div>
                </div>
                <ExpandButton width={15} height={15} description={"max"} action={expand} />
                
            </motion.div>}
            {interacted ? 
            <div onMouseDown={() => {toggleMouseDown(true)}}
            onMouseUp={() => {toggleMouseDown(false)}}
            
            onClick={scrub}
             className='video-progress-bar-container'>
                <div style={{height: '100%', width: `${progress}%`, backgroundColor: accentColor, transition: '0.1s'}} ></div>
            </div>
            : null}
        </div>
    )
}
