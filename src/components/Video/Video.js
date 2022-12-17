// library's

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { selectAccentColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAutoPlayNativeVideos } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { ExpandButton } from '../buttons/ExpandButton/ExpandButton';
import { AudioToggleButton } from '../buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { PauseButton } from '../buttons/PauseButton/PauseButton';
import { PlayButton } from '../buttons/PlayButton/PlayButton';
import { useIntersection } from '../useIntersection/useIntersection';

// style's
import "./Video.css";

export const Video = ({ video, id, looping = false, objectFit = 'contain', height = "100%", mutedToggled, marginLeft}) => {

    const ref = React.useRef();

    const visible = useIntersection(ref, '0px');

    const [muted, toggleMuted] = React.useState(true);
    
    const [playing, togglePlaying] = React.useState(false);

    const accentColor = useSelector(selectAccentColor);

    const social_autoplay = useSelector(selectAutoPlayNativeVideos);

    const dispatch = useDispatch();

    const handlePlayState = (e) => {
        e.stopPropagation();
        if (playing) {
            document.getElementById(video + id).pause();
        } else {
            document.getElementById(video + id).play();
        }
        togglePlaying(!playing);
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
    }

    const expand = (e) => {
        e.stopPropagation();
        dispatch(setExpandedContent(video))
    }

    React.useEffect(() => {

        if (visible && social_autoplay) {
            togglePlaying(true);

            document.getElementById(video + id).play();
        } else {
            togglePlaying(false);

            document.getElementById(video + id).pause();
        }

    }, [visible])

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
            ref={ref}
            loading="lazy"
            style={{objectFit: objectFit}}
            muted={mutedToggled ? true : false}
            onEnded={onVideoEnd} autoPlay={looping ? true : false} id={video + id} controls={false} src={video} loop={true} />
            {looping ? null :
            <div 
            style={{
                backgroundColor: accentColor
            }}
            className='message-video-controls-container'>
                {playing ?
                <PauseButton action={handlePlayState} />
                :
                <PlayButton action={handlePlayState} />
                }
                <AudioToggleButton description={!muted ? 'un-mute' : 'mute'} action={handleMuteState} state={muted} />
                <ExpandButton description={"Full Screen"} action={expand} />
            </div>}
        </div>
    )
}
