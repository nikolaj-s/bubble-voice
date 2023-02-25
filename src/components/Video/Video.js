// library's

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { selectAccentColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
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

    const accentColor = useSelector(selectAccentColor);

    const color = useSelector(selectTextColor);

    const social_autoplay = useSelector(selectAutoPlayNativeVideos);

    const social_mute = useSelector(selectMuteSocialVideos);

    const controlAnimation = useAnimation();

    let mouseMoveTimeOut;

    const dispatch = useDispatch();

    const handlePlayState = (e) => {
        e.stopPropagation();
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
            transition={{duration: 0.1}}
            onMouseMove={() => {showControls(true)}}
            style={{
                backgroundColor: accentColor
            }}
            className='message-video-controls-container'>
                {playing ?
                <PauseButton width={20} height={20} action={handlePlayState} />
                :
                <PlayButton width={20} height={20} action={handlePlayState} />
                }
                <AudioToggleButton width={20} height={20} description={!muted ? 'un-mute' : 'mute'} action={handleMuteState} state={muted} />
                <ExpandButton width={20} height={20} description={"max"} action={expand} />
            </motion.div>}
        </div>
    )
}
