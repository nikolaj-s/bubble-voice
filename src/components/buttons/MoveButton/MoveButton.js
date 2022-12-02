import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const MoveButton = ({position, top, left, zIndex, width = 50, height = 50}) => {

    const textColor = useSelector(selectTextColor)

    return (
        <ButtonAnimationWrapper 
        width={width}
        height={height}
        margin={"0 10px 0 0"}
        position={position}
        top={top}
        left={left}
        zIndex={zIndex}
        altInvert={true}
        >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.75 37.5L25 43.75L31.25 37.5M25 31.25V43.75M31.25 12.5L25 6.25L18.75 12.5M25 6.25V18.75" stroke={textColor} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
