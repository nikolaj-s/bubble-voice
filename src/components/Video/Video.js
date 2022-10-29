// library's

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { selectAccentColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ExpandButton } from '../buttons/ExpandButton/ExpandButton';
import { AudioToggleButton } from '../buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { PauseButton } from '../buttons/PauseButton/PauseButton';
import { PlayButton } from '../buttons/PlayButton/PlayButton';

// style's
import "./Video.css";

export const Video = ({ video, id, looping = false, objectFit = 'contain', height = "100%"}) => {

    const [muted, toggleMuted] = React.useState(true);
    
    const [playing, togglePlaying] = React.useState(false);

    const accentColor = useSelector(selectAccentColor);

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

    return (
        <div 
        style={{
            height: height
        }}
        onClick={handlePlayState}
        className='message-video-container'>
            <video 
            loading="lazy"
            style={{objectFit: objectFit}}
            muted={looping ? true : false}
            onEnded={onVideoEnd} autoPlay={looping ? true : false} id={video + id} controls={false} src={video} loop={looping} />
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
                <AudioToggleButton action={handleMuteState} state={muted} />
                <ExpandButton action={expand} />
            </div>}
        </div>
    )
}
