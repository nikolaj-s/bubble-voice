import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./NoBansNotice.css";

export const NoBansNotice = () => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='no-bans-notice-container'>
            <p
            style={{color: textColor}}
            >There is currently no banned users.</p>
        </div>
    )
}
