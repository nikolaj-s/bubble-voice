import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const MusicOverlayButton = ({width, height, action, description}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper description={description} width={width} height={height} action={action} >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.2085 43.75H10.4168M5.2085 37.5H10.4168M5.2085 31.25H10.4168M5.2085 25H10.4168M16.6668 43.75H21.8752M16.6668 37.5H21.8752M16.6668 31.25H21.8752M16.6668 25H21.8752M16.6668 18.75H21.8752M16.6668 12.5H21.8752M16.6668 6.25H21.8752M28.1252 43.75H33.3335M39.5835 43.75H44.7918M28.1252 37.5H33.3335M39.5835 37.5H44.7918M28.1252 31.25H33.3335M39.5835 31.25H44.7918M39.5835 25H44.7918M39.5835 18.75H44.7918" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
