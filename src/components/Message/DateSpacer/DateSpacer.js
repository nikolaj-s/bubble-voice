import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./DateSpacer.css";

export const DateSpacer = ({d}) => {
    
    const textColor = useSelector(selectTextColor);

    const date = d?.toString()?.split(' ')?.slice(0, 4)?.join(' ');

    return (
        <div className='date-spacer-container'>
            <div style={{backgroundColor: textColor}} className='date-spacer-line'></div>
            <p style={{color: textColor}}>{date}</p>
            <div style={{backgroundColor: textColor}}  className='date-spacer-line'></div>
        </div>
    )
}
