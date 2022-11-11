// library's
import React from 'react'

// state
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioOutput } from '../appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { playSoundEffect, removeSoundEffectFromQueue, selectSocialSoundEffect, selectSoundEffect, selectSoundEffectQueue, selectSoundEffectVolume } from './soundEffectsSlice';

const connected = require('../../../assets/connected.wav');

const disconnected = require('../../../assets/disconnect.mp3');

const userJoined = require('../../../assets/user_has_joined.mp3');

const userDisconnected = require('../../../assets/user_has_disconnected.mp3');

const controlSoundEffect = require('../../../assets/control-sound-effect.mp3');

const channelDeleted = require('../../../assets/channel-has-been-deleted.mp3');

const userPoked = require('../../../assets/hey-wake-up.mp3');

const userKicked = require('../../../assets/you-have-been-kicked-from-the-server.mp3');

const lostConnection = require('../../../assets/lost-connection.mp3');

const moved = require('../../../assets/moved.mp3')

const deactivate = require('../../../assets/deactivate.mp3')

export const SoundEffects = () => {

    const soundEffect = useSelector(selectSoundEffect);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume);

    const [playing, setPlaying] = React.useState("");

    const audioOutput = useSelector(selectAudioOutput);

    const dispatch = useDispatch();

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

    const soundEffectQueue = useSelector(selectSoundEffectQueue);

    const soundEffects = {
        'connected': connected,
        'disconnected': disconnected,
        'userJoined': userJoined,
        'userDisconnected': userDisconnected,
        'controlSoundEffect': controlSoundEffect,
        'channelDeleted': channelDeleted,
        'youHaveBeenPoked': userPoked,
        'newMessage': connected,
        'userKicked': userKicked,
        'lostConnection': lostConnection,
        'moved': moved,
        'deactivate': deactivate
    }

    React.useEffect(() => {
        
        document.getElementById('sound-effects-source').volume = soundEffectsVolume;
    
    // eslint-disable-next-line
    }, [soundEffectsVolume])
    
    React.useEffect(() => {

        if (soundEffectQueue.length > 2) return;
        
        if ((soundEffect === 'newMessage' && socialSoundEffect === false) || (soundEffects[soundEffect] === undefined)) return; 
        
        dispatch(playSoundEffect(soundEffects[soundEffect]));
        
    // eslint-disable-next-line
    }, [soundEffect, socialSoundEffect])

    const soundEffectFinished = () => {

        setPlaying("");

        setTimeout(() => {
            dispatch(removeSoundEffectFromQueue());
        }, 10)
        
    }

    React.useEffect(() => {

        try {
            document.getElementById('sound-effects-source').setSinkId(audioOutput._id);
        } catch (error) {
            console.log(error)
        }

    // eslint-disable-next-line
    }, [audioOutput])

    React.useEffect(() => {

        setTimeout(() => {

            setPlaying(soundEffects[soundEffectQueue[0]]);
            
        }, 10)

    // eslint-disable-next-line       
    }, [soundEffectQueue])

    return (
        <>
        <audio id="sound-effects-source" onEnded={soundEffectFinished} src={playing} hidden={true} playsInline={true} autoPlay={true} loop={false} />
        </>
    )
}
