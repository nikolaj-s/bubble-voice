import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const LeaveServerButton = ({action, width, height, id, padding, borderRadius, description, margin, invert, desc_space}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper desc_space={desc_space} zIndex={1} altInvert={true} margin={margin} invert={invert} padding={padding} description={description} borderRadius={borderRadius} width={width} height={height} id={id} action={action} >
            <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8325 30L5.62502 23.75L10.8325 30ZM10.8325 17.5L5.62502 23.75L10.8325 17.5Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.75 23.75H25M40 41.25H17.5M40 6.25H17.5M17.5 41.25V31.25M17.5 16.25V6.25M40 41.25V6.25" stroke={color} strokeWidth="3" strokeLinecap="round"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
