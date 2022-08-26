// library's
import React from 'react'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { useSelector } from 'react-redux';
// style's
import "./OptionSpacer.css";

export const OptionSpacer = ({name = "Or"}) => {

    const textColor = useSelector(selectTextColor)

    return (
        <div className='option-spacer-container'>
            <div style={{backgroundColor: textColor}} className='line-spacer'></div>
            <h3 style={{color: textColor}}>{name}</h3>
            <div style={{backgroundColor: textColor}} className='line-spacer'></div>
        </div>
    )
}
