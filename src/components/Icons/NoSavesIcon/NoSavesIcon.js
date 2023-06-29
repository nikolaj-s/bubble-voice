import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const NoSavesIcon = ({className}) => {

    const color = useSelector(selectTextColor);

    return (
        <div className={className}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.25 6.25L43.75 43.75M35.4167 35.4167V41.6667L25 35.4167L14.5833 41.6667V14.5833M17.0375 8.7125C17.5625 8.47708 18.1417 8.34583 18.75 8.34583H31.25C32.3551 8.34583 33.4149 8.78482 34.1963 9.56622C34.9777 10.3476 35.4167 11.4074 35.4167 12.5125V27.0958" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}
