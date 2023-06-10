import React from 'react'
import { useSelector } from 'react-redux'
import { AltError } from '../../../../../components/AltError/AltError';

// components
import {ApplyCancelButton} from '../../../../../components/buttons/ApplyCancelButton/ApplyCancelButton'
import { selectPrimaryColor, selectTextColor } from '../../appearanceSettings/appearanceSettingsSlice';
import { selectAdvancedVoiceActivation, selectVoiceActivationSensitivity, selectVoiceActivityState } from '../voiceVideoSettingsSlice';

import { AudioAnalyser } from './AudioAnalyser/AudioAnalyser';

// style
import "./ListenToMicrophoneLevel.css";

export const ListenToMicrophoneLevel = () => {

    const [open, toggleOpen] = React.useState(false);

    const [error, toggleError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");

    const primaryColor = useSelector(selectPrimaryColor);

    const voiceActivationSensitivity = useSelector(selectVoiceActivationSensitivity);

    const voiceActivity = useSelector(selectVoiceActivityState);

    const textColor = useSelector(selectTextColor);

    const advancedVoiceActivationDetection = useSelector(selectAdvancedVoiceActivation);

    const testAudio = () => {
        toggleOpen(true);
    }

    const stopMic = () => {

        toggleOpen(false);

        toggleError(false);

        setErrorMessage("");

        setTimeout(() => {

            document.querySelectorAll('.pid').forEach(pid => {
                pid.style.backgroundColor = primaryColor;
            })
        
        }, 10)     
    }

    React.useEffect(() => {

        return () => {
            if (open !== false) {
                stopMic();
            }
        }

    // eslint-disable-next-line
    }, [])

    const handleThrowError = (errorMessage) => {

        toggleError(true);

        setErrorMessage(errorMessage);

    }

    return (
        <div className='listen-to-audio-container'>
            {
            voiceActivity && advancedVoiceActivationDetection === false ? <div style={{backgroundColor: textColor, left: `${voiceActivationSensitivity * 2.5}px`}} className='voice-activation-position'></div> : null
            }
            { open === false ? null : <AudioAnalyser throwError={handleThrowError} /> }
            <div className='audio-level-bars-container'>
                {[...Array(50).keys()].map(item => {
                    return (
                        <div 
                        style={{backgroundColor: primaryColor}}
                        key={item} className='pid'>
                        </div>
                    )
                }) }
            </div>
            <AltError error={error} errorMessage={errorMessage} />
            <ApplyCancelButton toggled={open} cancel={stopMic} name={"Start"} apply={testAudio} />
        </div>
    )
}
