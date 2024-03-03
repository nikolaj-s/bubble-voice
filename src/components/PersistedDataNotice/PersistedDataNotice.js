import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./PersistedDataNotice.css";

export const PersistedDataNotice = ({persisted, channelName, type, guidelines}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        <div className='persisted-notice-container'>
            <h1 style={{color: textColor, margin: 0, fontSize: 126, opacity: 0.5}}>#</h1>
            <h3 style={{color: textColor, marginTop: 0}}>
                {type === "screenshots" ?
                "This is the beginning of the screen shots taken within this bubble."
                :
                `Welcome To ${channelName}`}
                
            </h3>
            {guidelines ?
            <p style={{color: textColor}}>
            {guidelines}
            </p>
            : null}
        </div>
        </>
    )
}
