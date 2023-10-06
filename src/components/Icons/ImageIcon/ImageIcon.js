import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ImageIcon = ({center = false, zIndex, animation}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <svg width="28" height="28" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M37.5 31.25V37.5H31.25V41.6667H37.5V47.9167H41.6667V41.6667H47.9167V37.5H41.6667V31.25H37.5ZM27.7083 43.75H10.4167C8.125 43.75 6.25 41.875 6.25 39.5833V10.4167C6.25 8.125 8.125 6.25 10.4167 6.25H39.5833C41.875 6.25 43.75 8.125 43.75 10.4167V27.7083C42.5 27.2917 41.0417 27.0833 39.5833 27.0833C37.2917 27.0833 35 27.7083 33.125 28.9583L30.2083 25L22.9167 34.375L17.7083 28.125L10.4167 37.5H27.2917C27.0833 38.125 27.0833 38.9583 27.0833 39.5833C27.0833 41.0417 27.2917 42.5 27.7083 43.75Z" fill={textColor}/>
</svg>

    )
}
