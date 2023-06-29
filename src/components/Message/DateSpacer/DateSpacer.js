import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./DateSpacer.css";
import { Months } from '../../../util/Months';

export const DateSpacer = ({d}) => {

    const textColor = useSelector(selectTextColor);

    const arr = d?.split('-');

    const date = arr ? `${Months[arr[1]]} ${arr[2]}, ${arr[0]}` : ""

    return (
        <div className='date-spacer-container'>
            <div style={{backgroundColor: textColor}} className='date-spacer-line'></div>
            <p style={{color: textColor}}>{date}</p>
            <div style={{backgroundColor: textColor}}  className='date-spacer-line'></div>
        </div>
    )
}
