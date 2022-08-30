// library's
import React from 'react'

// state
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioOutput } from '../appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { playSoundEffect, selectSoundEffect, selectSoundEffectVolume } from './soundEffectsSlice';

const connected = require('../../../assets/connected.wav');

const disconnected = require('../../../assets/disconnected.wav');

const userJoined = require('../../../assets/user_has_joined.mp3');

const userDisconnected = require('../../../assets/user_has_disconnected.mp3');

const controlSoundEffect = require('../../../assets/control-sound-effect.mp3');

const channelDeleted = require('../../../assets/channel-has-been-deleted.mp3');

const userPoked = require('../../../assets/you-have-been-poked.mp3')

export const SoundEffects = () => {

    const soundEffect = useSelector(selectSoundEffect);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume);

    const audioOutput = useSelector(selectAudioOutput);

    const dispatch = useDispatch();

    const [playing, togglePlaying] = React.useState("");

    const soundEffects = {
        'connected': connected,
        'disconnected': disconnected,
        'userJoined': userJoined,
        'userDisconnected': userDisconnected,
        'controlSoundEffect': controlSoundEffect,
        'channelDeleted': channelDeleted,
        'youHaveBeenPoked': userPoked
    }

    React.useEffect(() => {
        
        document.getElementById('sound-effects-source').volume = soundEffectsVolume;
    
    // eslint-disable-next-line
    }, [soundEffectsVolume])
    
    React.useEffect(() => {

        togglePlaying(soundEffects[soundEffect]);
        
    // eslint-disable-next-line
    }, [soundEffect])

    const soundEffectFinished = () => {
        dispatch(playSoundEffect(""));
    }

    React.useEffect(() => {

        try {
            document.getElementById('sound-effects-source').setSinkId(audioOutput._id);
        } catch (error) {
            console.log(error)
        }

    }, [audioOutput])

    return (
        <>
        <audio id="sound-effects-source" onEnded={soundEffectFinished} hidden={true} autoPlay={true} src={playing} loop={false} />
        </>
    )
}
