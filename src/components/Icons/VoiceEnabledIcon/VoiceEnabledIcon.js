import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const VoiceEnabledIcon = ({opacity}) => {

    const color = useSelector(selectTextColor);

    return (
        <svg width="18" height="17" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6.50001C16.333 8.27801 16.333 11.722 15 13.5M18 3.00001C21.988 6.80801 22.012 13.217 18 17M1 12.959V7.04001C1 6.46601 1.448 6.00001 2 6.00001H5.586C5.71833 5.99954 5.8492 5.97228 5.97071 5.91986C6.09222 5.86744 6.20185 5.79095 6.293 5.69501L9.293 2.30701C9.923 1.65101 11 2.11601 11 3.04301V16.957C11 17.891 9.91 18.352 9.284 17.683L6.294 14.314C6.20259 14.2153 6.09185 14.1365 5.96867 14.0825C5.84549 14.0285 5.71251 14.0004 5.578 14H2C1.448 14 1 13.534 1 12.959Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
