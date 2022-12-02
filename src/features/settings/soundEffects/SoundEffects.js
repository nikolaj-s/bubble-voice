// library's
import React from 'react'

// state
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioOutput } from '../appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { playSoundEffect, removeSoundEffectFromQueue, selectSocialSoundEffect, selectSoundEffect, selectSoundEffectQueue, selectSoundEffectVolume } from './soundEffectsSlice';

export const SoundEffects = () => {

    const soundEffect = useSelector(selectSoundEffect);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume);

    const [playing, setPlaying] = React.useState("");

    const audioOutput = useSelector(selectAudioOutput);

    const dispatch = useDispatch();

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

    const soundEffectQueue = useSelector(selectSoundEffectQueue);

    const soundEffects = {
        'connected': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/connected_pnu1hk.wav",
        'disconnected': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/disconnect_zpef4b.mp3",
        'userJoined': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/user_has_joined_lzaaqf.mp3",
        'userDisconnected': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/user_has_disconnected_zqajz0.mp3",
        'controlSoundEffect': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/control-sound-effect_fizuj9.mp3",
        'channelDeleted': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898472/channel-has-been-deleted_vuc7yy.mp3",
        'youHaveBeenPoked': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/hey-wake-up_poprdv.mp3",
        'newMessage': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/connected_pnu1hk.wav",
        'userKicked': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/you-have-been-kicked-from-the-server_ywzaba.mp3",
        'lostConnection': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/lost-connection_aeqih2.mp3",
        'moved': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/moved_jszssq.mp3",
        'deactivate': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/deactivate_naxcd8.mp3",
        "altPop": "https://res.cloudinary.com/drlkgoter/video/upload/v1670015949/cork-85200_m6ej0k.mp3"
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
