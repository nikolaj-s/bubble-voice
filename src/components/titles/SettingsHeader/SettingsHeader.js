
// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./SettingsHeader.css";

export const SettingsHeader = ({title}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='settings-header-container'>
            <h2
            className='settings-header'
            style={{
                color: textColor
            }}
            >
                {title}
            </h2>
        </div>
    )
}
