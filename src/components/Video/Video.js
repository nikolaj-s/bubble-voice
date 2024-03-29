// library's

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent, setVideoStartTime } from '../../features/ExpandContent/ExpandContentSlice';
import { selectAccentColor, selectGlassColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { miscSettingsChannelSpecificStateChange, selectAutoPlayNativeVideos, selectMuteSocialVideos, selectVideoVolume, setVideoVolume } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
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

export const Video = ({width, backgroundColor = 'black', maxHeight = '100%', video, id, looping = false, objectFit = 'contain', height = "100%", mutedToggled, marginLeft, forceAutoPlay = false, currentTime = 0}) => {

    const ref = React.useRef();

    const visible = useIntersection(ref, '-400px');

    const [muted, toggleMuted] = React.useState(true);

    const [altAudioAttempted, toggleAltAudioAttempted] = React.useState(false);
    
    const [playing, togglePlaying] = React.useState(false);

    const [interacted, toggleInteracted] = React.useState(false);

    const [progress, setProgress] = React.useState(0);

    const [showVolume, toggleShowVolume] = React.useState(false);

    const videoVolume = useSelector(selectVideoVolume);

    const accentColor = useSelector(selectAccentColor);

    const color = useSelector(selectTextColor);

    const glassColor = useSelector(selectGlassColor);

    const social_autoplay = useSelector(selectAutoPlayNativeVideos);

    const social_mute = useSelector(selectMuteSocialVideos);

    const controlAnimation = useAnimation();

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

        dispatch(miscSettingsChannelSpecificStateChange('muteSocialVideos'))
        // if (muted) {
        //     document.getElementById(video + id).muted = true;
        //     document.getElementById(video + 'audio').muted = true;
        // } else {
        //     document.getElementById(video + id).muted = false;
        //     document.getElementById(video + 'audio').muted = false;
        // }

        // toggleMuted(!muted)
    }

    const onVideoEnd = () => {
        if (looping) return;
        togglePlaying(false);
        toggleInteracted(false);
    }

    const expand = (e) => {
        e.stopPropagation();

        togglePlaying(false);

        document.getElementById(video + id)?.pause();
        
        document.getElementById(video + 'audio')?.pause();

        dispatch(setExpandedContent(video));

        dispatch(setVideoStartTime(document.getElementById(video + id)?.currentTime))
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

        if (visible && social_autoplay || forceAutoPlay) {
            togglePlaying(true);

            toggleInteracted(true);

            document.getElementById(video + id).play();

            document.getElementById(video + 'audio').play();

            controlAnimation.start({opacity: 0});
    
            document.getElementById(video + id).volume = videoVolume;

            document.getElementById(video + 'audio').volume = videoVolume;

            if (currentTime !== 0) {
                document.getElementById(video + id).currentTime = currentTime;
            }
           
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
        //    toggleMuted(false);
        }

    }, [social_mute])



    const handleVolumeChange = (value) => {
        dispatch(setVideoVolume(value));

        document.getElementById(video + id).volume = value;

        document.getElementById(video + 'audio').volume = value;
    }

    const handleAltVideoLoad = async (e) => {

        // const d = await fetch(video, {
        //     headers: {
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // })
        // .then(res => res.blob())

    }

    const handleAltAudio = (e) => {

        if (e.target.src === null || altAudioAttempted) return;

        e.target.src = video?.includes('v.redd') ? video?.split('_')[0] + '_audio.mp4' : null;

        e.target.currentTime = currentTime;

        toggleAltAudioAttempted(true);
    }

    return (
        <div 
        style={{
            height: height,
            objectFit: objectFit,
            marginLeft: marginLeft,
            backgroundColor: backgroundColor,
            width: width
        }}
        onMouseMove={() => {showControls(true)}}
        onMouseLeave={() => {showControls(false)}}
        onClick={handlePlayState}
        className='message-video-container'>
            <video 
            onTimeUpdate={handleProgress}
            
            ref={ref}
            
            loading="lazy"
            onError={handleAltVideoLoad}
            style={{objectFit: objectFit, maxHeight: maxHeight, width: '100%'}}
            muted={social_mute}
            onEnded={onVideoEnd} autoPlay={forceAutoPlay ? true : looping ? true : false} id={video + id} controls={false} loop={true} 
            src={video?.includes('https') ? video : ""}
            />
            <audio playsInline onError={handleAltAudio} hidden={true} muted={false} loop={true} src={video?.includes('v.redd') ? video?.split('_')[0] + '_AUDIO_64.mp4' : null} id={video + 'audio'} />
            <VideoPlayOverlayAnimation interacted={interacted} color={color} playing={playing} />
            {(looping || !interacted) ? null :
            <motion.div 
            animate={controlAnimation}
            transition={{duration: 0.01}}
            onMouseMove={() => {showControls(true)}}
            className='message-video-controls-container'>
                <div className='inner-video-controls-container'>
                    {playing ?
                    <PauseButton desc_width={60} borderRadius={10} background={glassColor} width={15} height={15} action={handlePlayState} />
                    :
                    <PlayButton desc_width={60} borderRadius={10} background={glassColor} width={15} height={15} action={handlePlayState} />
                    }
                    <AudioToggleButton  borderRadius={10} background={glassColor} o_mouseEnter={() => {toggleShowVolume(true)}} o_mouseLeave={() => {toggleShowVolume(false)}}  width={15} height={15} action={handleMuteState} state={!social_mute} />
                    {showVolume ? <div onMouseEnter={() => {toggleShowVolume(true)}} onMouseLeave={() => {toggleShowVolume(false)}}  className='video-volume-slider'>
                        <Range disableBackground={true} action={handleVolumeChange} value={videoVolume} min={0} max={1} step={0.01} />
                    </div> : null}
                </div>
                <ExpandButton borderRadius={10} width={15} height={15} description={"max"} action={expand} />
                
            </motion.div>}
            {interacted ? 
            <div 
            onClick={scrub}
             className='video-progress-bar-container'>
                <div style={{height: '100%', width: `${progress}%`, backgroundColor: color, transition: '0.1s'}} ></div>
            </div>
            : null}
        </div>
    )
}
