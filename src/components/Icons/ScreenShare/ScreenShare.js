import React from 'react'
import { useSelector } from 'react-redux';

import {selectTextColor} from "../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice";

export const ScreenShare = () => {

    const color = useSelector(selectTextColor);

    return (
        <div className='extra-media-icon'>
           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.25 12.25H7.5V14.5H5V15.5H11V14.5H8.5V12.25H14.75C14.9488 12.2498 15.1395 12.1707 15.2801 12.0301C15.4207 11.8895 15.4998 11.6988 15.5 11.5V2.25C15.4998 2.05116 15.4207 1.86053 15.2801 1.71993C15.1395 1.57932 14.9488 1.50023 14.75 1.5H1.25C1.05116 1.50023 0.860528 1.57932 0.719926 1.71993C0.579324 1.86053 0.500232 2.05116 0.5 2.25V11.5C0.500232 11.6988 0.579324 11.8895 0.719926 12.0301C0.860528 12.1707 1.05116 12.2498 1.25 12.25V12.25ZM1.5 2.5H14.5V11.25H1.5V2.5Z" fill={color}/>
            </svg>
        </div>
    )
}
