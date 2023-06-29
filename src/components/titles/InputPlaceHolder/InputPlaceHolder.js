// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./InputPlaceHolder.css";

export const InputPlaceHolder = ({value, fontSize = '1.2rem', margin, height}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div
        className='input-placeholder-container'
        style={{
            backgroundColor: primaryColor,
            fontSize: fontSize,
            margin: margin,
            height: height
        }}
        >
            <h3
            style={{color: textColor}}
            >{value}</h3>
        </div>
    )
}
