// library's

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAutoPlayNativeVideos, selectMuteSocialVideos } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { ExpandButton } from '../buttons/ExpandButton/ExpandButton';
import { AudioToggleButton } from '../buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { PauseButton } from '../buttons/PauseButton/PauseButton';
import { PlayButton } from '../buttons/PlayButton/PlayButton';
import { useIntersection } from '../useIntersection/useIntersection';
import { motion, useAnimation } from 'framer-motion';

// style's
import "./Video.css";
import { VideoPlayOverlayAnimation } from './VideoPlayOverlayAnimation/VideoPlayOverlayAnimation';

export const Video = ({ video, id, looping = false, objectFit = 'contain', height = "100%", mutedToggled, marginLeft}) => {

    const ref = React.useRef();

    const visible = useIntersection(ref, '-400px');

    const [muted, toggleMuted] = React.useState(true);
    
    const [playing, togglePlaying] = React.useState(false);

    const [interacted, toggleInteracted] = React.useState(false);

    const [progress, setProgress] = React.useState(0);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

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
        } else {
            document.getElementById(video + id).play();
        }
        togglePlaying(!playing);

        toggleInteracted(true);
    }

    const handleMuteState = (e) => {
        e.stopPropagation();
        if (muted) {
            document.getElementById(video + id).muted = true;
        } else {
            document.getElementById(video + id).muted = false;
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

        clearTimeout(mouseMoveTimeOut);

        mouseMoveTimeOut = null;

        controlAnimation.start({opacity: 1})

        if (enter === false) {
        
            mouseMoveTimeOut = setTimeout(() => {

                controlAnimation.start({opacity: 0});

                if (!playing) toggleInteracted(false);
    
            }, 2000)
        } 
        
    }

    const handleProgress = (e) => {
        setProgress((e.target.currentTime / e.target.duration) * 100)
    }

    const scrub = (e) => {
        e.stopPropagation();

        const v = document.getElementById(video + id);
        
        const time = (e.nativeEvent.offsetX / e.target.offsetWidth) * v.duration;

        v.currentTime = time;

    }

    React.useEffect(() => {

        if (visible && social_autoplay) {
            togglePlaying(true);

            toggleInteracted(true);

            document.getElementById(video + id).play();

            mouseMoveTimeOut = setTimeout(() => {

                controlAnimation.start({opacity: 0});
    
            }, 2000)
        } else {
            togglePlaying(false);

            toggleInteracted(false);

            document.getElementById(video + id).pause();
        }

    }, [visible])

    React.useEffect(() => {

        if (social_mute) {
            document.getElementById(video + id).muted = true;
            toggleMuted(false);
        }

    }, [social_mute])

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
            onMouseMove={() => {showControls(false)}}
            ref={ref}
            loading="lazy"
            style={{objectFit: objectFit}}
            muted={mutedToggled ? true : false}
            onEnded={onVideoEnd} autoPlay={looping ? true : false} id={video + id} controls={false} src={video} loop={true} />
            <VideoPlayOverlayAnimation interacted={interacted} color={color} playing={playing} />
            {(looping || !interacted) ? null :
            <motion.div 
            animate={controlAnimation}
            transition={{duration: 0.01}}
            onMouseMove={() => {showControls(true)}}
            className='message-video-controls-container'>
                {playing ?
                <PauseButton  width={15} height={15} action={handlePlayState} />
                :
                <PlayButton width={15} height={15} action={handlePlayState} />
                }
                <AudioToggleButton width={15} height={15} description={!muted ? 'un-mute' : 'mute'} action={handleMuteState} state={muted} />
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
