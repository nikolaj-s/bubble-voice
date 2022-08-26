import React from 'react'
import { useSelector } from 'react-redux'

// components
import {ApplyCancelButton} from '../../../../../components/buttons/ApplyCancelButton/ApplyCancelButton'
import { selectPrimaryColor } from '../../appearanceSettings/appearanceSettingsSlice';

import { AudioAnalyser } from './AudioAnalyser/AudioAnalyser';

// style
import "./ListenToMicrophoneLevel.css";

export const ListenToMicrophoneLevel = () => {

    const [open, toggleOpen] = React.useState(false)

    const primaryColor = useSelector(selectPrimaryColor);

    const testAudio = () => {
        toggleOpen(true);
    }

    const stopMic = () => {
        toggleOpen(false)

        document.querySelectorAll('.pid').forEach(pid => {
            pid.style.backgroundColor = primaryColor;
        })
    }

    React.useEffect(() => {

        return () => {
            if (open !== false) {
                stopMic();
            }
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div className='listen-to-audio-container'>
            { open === false ? null : <AudioAnalyser /> }
            <div className='audio-level-bars-container'>
                {[...Array(30).keys()].map(item => {
                    return (
                        <div 
                        style={{backgroundColor: primaryColor}}
                        key={item} className='pid'>
                        </div>
                    )
                }) }
            </div>
            <ApplyCancelButton toggled={open} cancel={stopMic} name={"Start"} apply={testAudio} />
        </div>
    )
}
