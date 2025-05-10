import React from 'react'
import { useMediaPlayer } from '../../../../context/MediaPlayerContext'
import { ToolBar } from '../../../ui/Wrappers/ToolBar/ToolBar';
import IconButton from '../../../ui/Buttons/IconButton/IconButton';
import { Pause, Play, SkipForward, Volume, Volume2, VolumeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import VolumeSlider from '../../../ui/Inputs/VolumeSlider/VolumeSlider';
import { setMediaPlayerVolume, toggleMediaPlayerMuted } from '../../../../features/Channel/MediaPlayer/mediaPlayerSlice';

export const MediaPlayerInlineControls = () => {

    const dispatch = useDispatch();

    const {enabled, currentlyPlaying, next, loading, toggleIsPlaying, isPlaying} = useMediaPlayer();

    const {isMuted, volume} = useSelector(state => state.mediaPlayerSlice);

    const handleVolume = (value) => {

        dispatch(setMediaPlayerVolume(value));

    }

    const handleMute = () => {
        dispatch(toggleMediaPlayerMuted());
    }

    if (!enabled || !currentlyPlaying) return null;

    return (
        <ToolBar style={{backgroundColor: 'var(--primary-color)', marginLeft: 5}}>

            <IconButton 
            Icon={
                !isPlaying ?
                <Play color='var(--text-color)' />
                :
                <Pause color='var(--text-color)' />
            }
            title={isPlaying ? "Pause" : "Play"}
            onClick={toggleIsPlaying}
            />
            <IconButton 
            Icon={<SkipForward color='var(--text-color)' />}
            onClick={next}
            title={"Skip"}
            />
            <IconButton 
            Icon={isMuted ? <VolumeOff color='var(--text-color)' /> : <Volume2 color='var(--text-color)' />}
            onClick={handleMute}
            title={isMuted ? "Unmute" : "Mute"}
            />
            <VolumeSlider width={80} min={0} max={1} step={0.01} value={volume} label={volume * 100} onChange={handleVolume}  />
        </ToolBar>
    )
}
