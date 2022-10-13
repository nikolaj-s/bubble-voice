// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// component's
import { WarningIcon } from '../Icons/WarningIcon/WarningIcon';

// style's
import "./AltError.css";

export const AltError = ({error = false, errorMessage}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        {error ?
        <div className='alt-error-container'>
            <WarningIcon />
            <p
            style={{color: textColor}}
            >{errorMessage}</p>
        </div>
        : null
        }
        </>
    )
}
