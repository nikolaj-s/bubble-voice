import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./PersistedDataNotice.css";

export const PersistedDataNotice = ({persisted, channelName}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        <div className='persisted-notice-container'>
            <h3 style={{color: textColor}}>Welcome To {channelName}'s Social Feed</h3>
        </div>
        </>
    )
}
