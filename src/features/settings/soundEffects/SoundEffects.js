// library's
import React from 'react'

// state
import { useDispatch, useSelector } from 'react-redux';
import { selectAudioOutput, selectExperimentalAudioCapture } from '../appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { playSoundEffect, removeSoundEffectFromQueue, selectCurrentDynamicVoice, selectCurrentVoiceOver, selectDynamicVoiceAlerts, selectSocialSoundEffect, selectSoundEffect, selectSoundEffectQueue, selectSoundEffectVolume, selectVoicePitch, selectVoiceRate } from './soundEffectsSlice';
import { selectCurrentChannel, selectServerMembers } from '../../server/ServerSlice';
import { selectCurrentScreen, selectScreenShareState } from '../../controlBar/ControlBarSlice';

export const SoundEffects = () => {

    const soundEffect = useSelector(selectSoundEffect);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume);

    const [playing, setPlaying] = React.useState("");

    const audioOutput = useSelector(selectAudioOutput);

    const dispatch = useDispatch();

    const socialSoundEffect = useSelector(selectSocialSoundEffect);

    const soundEffectQueue = useSelector(selectSoundEffectQueue);

    const currentVoiceOver = useSelector(selectCurrentVoiceOver);

    const channel = useSelector(selectCurrentChannel);

    const dynamicVoiceAlerts = useSelector(selectDynamicVoiceAlerts);

    const currentVoice = useSelector(selectCurrentDynamicVoice)

    const voiceRate = useSelector(selectVoiceRate);

    const voicePitch = useSelector(selectVoicePitch);

    const members = useSelector(selectServerMembers);

    const sharingScreen = useSelector(selectCurrentScreen);

    const experimentalAudioCapture = useSelector(selectExperimentalAudioCapture);

    const soundEffects = {
        'connected': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/connected_pnu1hk.wav",
        'disconnected': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/disconnect_zpef4b.mp3",
        'userJoined': currentVoiceOver.state === 'male' ? "https://res.cloudinary.com/drlkgoter/video/upload/v1671138913/male-joined_fgw23o.mp3" : "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/user_has_joined_lzaaqf.mp3",
        'userDisconnected': currentVoiceOver.state === 'male' ? "https://res.cloudinary.com/drlkgoter/video/upload/v1671138913/male-disconnect_kywlbh.mp3" : "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/user_has_disconnected_zqajz0.mp3",
        'controlSoundEffect': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/control-sound-effect_fizuj9.mp3",
        'channelDeleted': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898472/channel-has-been-deleted_vuc7yy.mp3",
        'youHaveBeenPoked': currentVoiceOver.state === 'male' ? "https://res.cloudinary.com/drlkgoter/video/upload/v1671138913/male-wake-up_v5dcuu.mp3" : "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/hey-wake-up_poprdv.mp3",
        'newMessage': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/connected_pnu1hk.wav",
        'userKicked': currentVoiceOver.state === 'male' ? "https://res.cloudinary.com/drlkgoter/video/upload/v1671138913/male-kicked_sw7eyu.mp3" : "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/you-have-been-kicked-from-the-server_ywzaba.mp3",
        'lostConnection': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/lost-connection_aeqih2.mp3",
        'moved': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/moved_jszssq.mp3",
        'deactivate': "https://res.cloudinary.com/drlkgoter/video/upload/v1668898545/deactivate_naxcd8.mp3",
        "altPop": "https://res.cloudinary.com/drlkgoter/video/upload/v1670015949/cork-85200_m6ej0k.mp3"
    }

    const dynamicAlert = (message) => {
        
        let alert = new SpeechSynthesisUtterance(message);

        let voices = speechSynthesis.getVoices();

        alert.voice = voices[currentVoice];

        alert.volume = soundEffectsVolume;
        console.log(voicePitch, voiceRate)
        alert.pitch = voicePitch;

        alert.rate = voiceRate;

        window.speechSynthesis.speak(alert);

        alert.onend = () => {soundEffectFinished()}
    }

    React.useEffect(() => {
        try {
        document.getElementById('sound-effects-source').volume = soundEffectsVolume;
        } catch (err) {
            return;
        }
    // eslint-disable-next-line
    }, [soundEffectsVolume, sharingScreen])
    
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
         //   document.getElementById('sound-effects-source').setSinkId(audioOutput._id);
        } catch (error) {
            console.log(error)
        }

    // eslint-disable-next-line
    }, [audioOutput])

    React.useEffect(() => {

        if (sharingScreen && experimentalAudioCapture) {
            
            dispatch(removeSoundEffectFromQueue());

            return;
            
        }

        setTimeout(() => {
            
            if (soundEffectQueue[0]?.default === 'userJoined' && dynamicVoiceAlerts) {
                
                dynamicAlert(`${soundEffectQueue[0].user} has joined ${channel.channel_name}`)

            } else if (soundEffectQueue[0]?.default === 'userDisconnected' && dynamicVoiceAlerts) {
                
                const i = members.findIndex(u => u.username === soundEffectQueue[0].user);

                if (i !== -1) {
                    dynamicAlert(`${members[i].display_name} has disconnected`)
                } else {
                    setPlaying((soundEffects[soundEffectQueue[0]?.default] ? soundEffects[soundEffectQueue[0].default] : soundEffects[soundEffectQueue[0]]));
                }

            } else {

                setPlaying((soundEffects[soundEffectQueue[0]?.default] ? soundEffects[soundEffectQueue[0].default] : soundEffects[soundEffectQueue[0]]));
            
            }

            
        }, 10)

    // eslint-disable-next-line       
    }, [soundEffectQueue, sharingScreen, experimentalAudioCapture])

    return (
        <>
        {(sharingScreen && experimentalAudioCapture) ? null : <audio id="sound-effects-source" onEnded={soundEffectFinished} src={playing} hidden={true} playsInline={true} autoPlay={true} loop={false} />}
        </>
    )
}
