import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const AudioToggleButton = ({action, state, active, id, description, o_mouseLeave, o_mouseEnter}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        width={25}
        height={25}
        action={action}
        active={active}
        opacity={0.5}
        invert={true}
        id={id}
        description={description}
        zIndex={5}
        borderRadius={5}
        o_mouseEnter={o_mouseEnter}
        o_mouseLeave={o_mouseLeave}
        >
            {state ?
            <svg 
            width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7188 10.1562C42.9688 13.2812 46.0938 17.9688 46.0938 25C46.0938 32.0312 42.9688 36.7188 36.7188 39.8438M5.46875 17.9688V32.0312H13.2812L25.7812 41.4062V8.59375L13.2812 17.9688H5.46875ZM33.5938 19.5312C33.5938 19.5312 36.7188 21.0938 36.7188 25C36.7188 28.9062 33.5938 30.4688 33.5938 30.4688V19.5312Z" stroke={textColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>                       
            :
            <svg 
            width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7188 10.1562C42.9688 13.2812 46.0938 17.9688 46.0938 25C46.0938 32.0312 42.9688 36.7188 36.7188 39.8438M5.46875 17.9688V32.0312H13.2812L25.7812 41.4062V8.59375L13.2812 17.9688H5.46875ZM33.5938 19.5312C33.5938 19.5312 36.7188 21.0938 36.7188 25C36.7188 28.9062 33.5938 30.4688 33.5938 30.4688V19.5312Z" stroke={textColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="6" y="7.82861" width="4" height="53" rx="2" transform="rotate(-45 6 7.82861)" fill={textColor}/>
            </svg>
            }
        </ButtonAnimationWrapper>
    )
}


