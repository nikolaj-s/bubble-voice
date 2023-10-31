import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { CloseIcon } from '../../Icons/CloseIcon/CloseIcon';

import "./AltCloseCornerButton.css";

export const AltCloseCornerButton = ({width, height, right, top, action}) => {
    
    const primaryColor = useSelector(selectPrimaryColor);
    
    return (
        <div 
        onClick={action}
        style={{
            backgroundColor: primaryColor,
        }}
        className='alt-close-corner-button'>
            <CloseIcon />
        </div>
    )
}
