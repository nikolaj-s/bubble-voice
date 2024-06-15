import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccentColor, selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./ExpandedControlBar.css";
import { InputTitle } from '../../../components/titles/inputTitle/InputTitle';
import { RadioButton } from '../../../components/buttons/RadioButton/RadioButton';
import { handleSaveVoiceVideoSettings, selectPushToTalkState, selectVoiceActivityState, toggleVoiceActivity } from '../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { TextButton } from '../../../components/buttons/textButton/TextButton';
import { WebCam } from '../../../components/Icons/WebCam/WebCam';
import { selectWebCamPreview, toggleWebCamPreview } from '../ControlBarSlice';
import { Range } from '../../../components/inputs/Range/Range';
import { throwServerError } from '../../server/ServerSlice';
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';
import { selectSoundEffectVolume, setSoundEffectsVolume } from '../../settings/soundEffects/soundEffectsSlice';
import { ToggleButton } from '../../../components/buttons/ToggleButton/ToggleButton';
import { miscSettingsChannelSpecificStateChange, selectPushToTalkSoundEffectState } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { VoiceDetectionButton } from '../../../components/buttons/VoiceDetectSelectorButton/VoiceDetectionButton';

export const ExpandedControlBar = ({close}) => {

    const [loading, toggleLoading] = React.useState(false);

    const dispatch = useDispatch();

    const accentColor = useSelector(selectSecondaryColor);

    const pushToTalk = useSelector(selectPushToTalkState);

    const voiceActivity = useSelector(selectVoiceActivityState);

    const webCamPreview = useSelector(selectWebCamPreview);

    const soundEffectsVolume = useSelector(selectSoundEffectVolume);

    const pushToTalkSoundEffect = useSelector(selectPushToTalkSoundEffectState);

    const handleSoundEffectsVolume = (value) => {
        dispatch(setSoundEffectsVolume(value));
    }

    React.useEffect(() => {

        let el;

        setTimeout(() => {
            try {

                document.body.addEventListener('click', close);

                if (webCamPreview) {
                    toggleLoading(true);
                    navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {frameRate: 30, width: 961, height: 541}
                    }).then(stream => {

                        el = document.createElement('video');

                        el.srcObject = stream;

                        el.autoplay = true;

                        el.controls = false;

                        el.id = 'web-cam-mini-preview';

                        document.getElementsByClassName('web-cam-preview-container')[0].appendChild(el);

                        toggleLoading(false);
                    })

                } else {
                    document.getElementById('web-cam-mini-preview')?.srcObject?.getTracks()?.forEach(track => {
                        track.stop();
                    })

                    document.getElementById('web-cam-mini-preview')?.remove();
                }
            
            } catch (e) {
                dispatch(throwServerError({error: true, errorMessage: "Unable To Preview Webcam"}))
                toggleLoading(false);
            }
        }, 50)
            

    return () => {

        document.body.removeEventListener('click', close)

        el?.srcObject.getTracks().forEach(track => {
            track.stop();
        })

        el?.remove();
        
        toggleLoading(false);
    }

    }, [webCamPreview])

    const handleToggleVoiceState = () => {
        dispatch(toggleVoiceActivity());

        dispatch(handleSaveVoiceVideoSettings());
    }

    const handleToggleWebCamPreview = () => {
        dispatch(toggleWebCamPreview());
    }
    
    return (
        <div
        onClick={(e) => {e.stopPropagation()}}
        style={{backgroundColor: accentColor}}
        className='expanded-control-bar-container'
        >
            <InputTitle fontSize='0.7rem' marginTop={6} marginBottom={6} title={"Input Type"} />
            <div className='voice-input-type-container'>
                <VoiceDetectionButton action={handleToggleVoiceState} active={voiceActivity} state='Voice Activation' margin={'0px 4px 0px 0px'} />
                <VoiceDetectionButton action={handleToggleVoiceState} active={pushToTalk} />
            </div>
            <InputTitle title={"Enable Push To Talk Sound Effect"} />
            <ToggleButton state={pushToTalkSoundEffect} action={() => {dispatch(miscSettingsChannelSpecificStateChange("enablePushToTalkSoundEffect"))}}  />
            <InputTitle fontSize='0.7rem' marginBottom={6} marginTop={6} title={"Preview Webcam"} />
            <div className='web-cam-preview-container'>
                <Loading  loading={loading} />
                <WebCam />
            </div>
            <TextButton marginBottom={10} action={handleToggleWebCamPreview} textAlign='center' name={webCamPreview ? "Stop" : "Preview"} />
            <InputTitle fontSize='0.7rem' marginBottom={6} marginTop={6} title={"Sound Effects Volume"} />
            <Range max={1} min={0} value={soundEffectsVolume} action={handleSoundEffectsVolume} />
        </div>
    )
}
