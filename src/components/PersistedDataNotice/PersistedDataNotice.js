import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./PersistedDataNotice.css";

export const PersistedDataNotice = ({persisted}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        {persisted ?
        <div className='persisted-notice-container'>
            <h3 style={{color: textColor}}>This Channels Social Feed Is Not Persisted</h3>
            <p style={{color: textColor}}>All messages sent will be deleted when no users are in this channel.</p>
        </div>
        : null}
        </>
    )
}
