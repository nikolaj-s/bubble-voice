import React from 'react'
import { useSelector } from 'react-redux';
import { Range } from '../../../../../components/inputs/Range/Range'
import { selectPrimaryColor, selectTextColor } from '../../appearanceSettings/appearanceSettingsSlice';

import "./VoiceDeactivationDelay.css";

export const VoiceDeactivationDelay = ({value, action, save}) => {
    
    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div 
        className='voice-activation-control-container'>
            <div
            style={{backgroundColor: primaryColor}} className='voice-activation-value-container'>
                <h3 style={{color: textColor}}>{value} ms</h3>
            </div>
            <Range value={value} save={save} action={action} min={5} step={1} max={1000} />
        </div>
    )
}
