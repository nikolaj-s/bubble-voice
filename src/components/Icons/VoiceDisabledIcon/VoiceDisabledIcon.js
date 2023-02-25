import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const VoiceDisabledIcon = () => {

    const textColor = useSelector(selectTextColor);

    return (
        <svg width="18" height="17" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 7.50001C16.333 9.27801 16.333 12.722 15 14.5M18 4.00001C21.988 7.80801 22.012 14.217 18 18M1 13.959V8.04001C1 7.46601 1.448 7.00001 2 7.00001H5.586C5.71833 6.99954 5.8492 6.97228 5.97071 6.91986C6.09222 6.86744 6.20185 6.79095 6.293 6.69501L9.293 3.30701C9.923 2.65101 11 3.11601 11 4.04301V17.957C11 18.891 9.91 19.352 9.284 18.683L6.294 15.314C6.20259 15.2153 6.09185 15.1365 5.96867 15.0825C5.84549 15.0285 5.71251 15.0004 5.578 15H2C1.448 15 1 14.534 1 13.959Z" stroke={textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<line x1="2.07828" y1="1.17822" x2="20.7638" y2="19.8638" stroke={textColor} strokeWidth="2" strokeLinecap="round"/>
</svg>

    )
}
