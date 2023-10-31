import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectGlassColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import { AltKickedIcon } from '../../../components/Icons/AltKickedIcon/AltKickedIcon';

import "./KickedMessage.css";
import { CloseIcon } from '../../../components/Icons/CloseIcon/CloseIcon';

export const KickedMessage = ({message, close}) => {

    const glassColor = useSelector(selectGlassColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div
        style={{backgroundColor: glassColor}}
        className='kicked-message-outer-container'>
            <div 
            style={{backgroundColor: secondaryColor}}
            className='kicked-message-inner-container'>
                <div 
                onClick={close}
                style={{backgroundColor: accentColor}}
                className='close-kicked-container-button'>
                    <CloseIcon />
                </div>
                <h1 style={{color: textColor}}>You Were Kicked</h1>
                <AltKickedIcon />
                <p style={{color: textColor}}>{message}</p>
            </div>
        </div>
    )
}
