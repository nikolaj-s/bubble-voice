import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const FilterIcon = ({width = 24, height = 18}) => {

    const color = useSelector(selectTextColor);

    return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.625 2.75H21.375M5.75 9H18.25M9.5 15.25H14.5" stroke={color} strokeWidth="3.88" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


    )
}
