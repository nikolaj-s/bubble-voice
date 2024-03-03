import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccentColor, selectPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./UserTypingIndicator.css";
import { selectAppFocusedState } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const UserTypingIndicator = () => {

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const focused = useSelector(selectAppFocusedState);

    return (
        <div 
        style={{backgroundColor: accentColor}}
        className='user-typing-indicator-container'>
            {[1,2,3].map((v) => {
                return <div 
                style={{
                    backgroundColor: primaryColor
                }}
                className={`dot dot-${v} ${focused ? 'dot-' + v + '-animation' : ""}`} />
            })}
        </div>
    )
}
