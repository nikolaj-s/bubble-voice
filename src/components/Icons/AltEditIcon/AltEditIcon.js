import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const AltEditIcon = () => {

    const color = useSelector(selectTextColor);

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_159_2)">
    <path d="M3.438 20.04L10.2225 27.174L0.75 30L3.438 20.04ZM19.0575 3.61799L25.8405 10.7505L10.899 26.46L4.1145 19.329L19.0575 3.61799ZM24.213 0.521995L28.677 5.21549C29.8875 6.48749 28.806 7.63499 28.806 7.63499L26.5245 10.035L19.7385 2.89949L22.02 0.500995L22.05 0.472495C22.2285 0.304495 23.2125 -0.529505 24.213 0.521995Z" fill={color}/>
    </g>
    <defs>
    <clipPath id="clip0_159_2">
    <rect width="30" height="30" fill={color}/>
    </clipPath>
    </defs>
    </svg>
    

  )
}
