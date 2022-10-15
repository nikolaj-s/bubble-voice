// library's

import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AudioToggleButton } from '../buttons/mediaButtons/audioToggleButton/AudioToggleButton';
import { PauseButton } from '../buttons/PauseButton/PauseButton';
import { PlayButton } from '../buttons/PlayButton/PlayButton';

// style's
import "./Video.css";

export const Video = ({ video, id, looping = false, objectFit = 'contain', height = "100%"}) => {

    const [muted, toggleMuted] = React.useState(true);
    
    const [playing, togglePlaying] = React.useState(false);

    const accentColor = useSelector(selectAccentColor);

    const handlePlayState = () => {
        if (playing) {
            document.getElementById(video + id).pause();
        } else {
            document.getElementById(video + id).play();
        }
        togglePlaying(!playing);
    }

    const handleMuteState = () => {
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

    return (
        <div 
        style={{
            height: height
        }}
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
            </div>}
        </div>
    )
}
