import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const NullButton = (props) => {

    const textColor = useSelector(selectTextColor)

    return (
        <ButtonAnimationWrapper {...props}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3ZM0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12Z" fill={textColor}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M20.4855 3.5145C20.7667 3.79579 20.9246 4.17725 20.9246 4.575C20.9246 4.97274 20.7667 5.35421 20.4855 5.6355L5.63545 20.4855C5.35255 20.7587 4.97365 20.9099 4.58035 20.9065C4.18705 20.9031 3.81084 20.7453 3.53272 20.4672C3.25461 20.1891 3.09686 19.8129 3.09344 19.4196C3.09002 19.0263 3.24121 18.6474 3.51445 18.3645L18.3645 3.5145C18.6457 3.23329 19.0272 3.07532 19.425 3.07532C19.8227 3.07532 20.2042 3.23329 20.4855 3.5145Z" fill={textColor}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
