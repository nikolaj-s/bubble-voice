import React from 'react'

import "./SafeSearchIndicator.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const SafeSearchIndicator = ({active = false}) => {

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div
        className='safe-search-indicator-container'
        style={{
            backgroundColor: accentColor
        }}
        >
            <p
            style={{
                color: textColor
            }}
            >{active ?
            "Safe search is disabled"
            :
            "Safe search is enabled"
            }</p>
        </div>
    )
}
