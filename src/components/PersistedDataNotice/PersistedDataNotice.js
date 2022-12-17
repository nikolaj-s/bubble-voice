import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./PersistedDataNotice.css";

export const PersistedDataNotice = ({persisted, channelName}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        {persisted ?
        <div className='persisted-notice-container'>
            <h3 style={{color: textColor}}>{channelName}'s Social Feed Is Not Persisted</h3>
            <p style={{color: textColor}}>All messages sent will be deleted when no users are in this channel.</p>
        </div>
        : 
        <div className='persisted-notice-container'>
            <h3 style={{color: textColor}}>Welcome To {channelName}'s Social Feed</h3>
            <p style={{color: textColor}}>This channels social data is persisted.</p>
        </div>
        }
        </>
    )
}
