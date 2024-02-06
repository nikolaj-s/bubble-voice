import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const AudioWaveIcon = () => {

    const textColor = useSelector(selectTextColor);

    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 12.5V16.25M7.5 7.5V21.25M12.5 3.75V26.25M17.5 10V18.75M22.5 6.25V22.5M27.5 12.5V16.25" stroke={textColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


    )
}
