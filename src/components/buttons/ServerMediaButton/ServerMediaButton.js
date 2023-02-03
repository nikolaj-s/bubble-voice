import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ServerMediaButton = ({active, action}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper action={action} description={"Server Media"} altInvert={!active} borderRadius='0' padding={0} height={45} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7.6V20.4C21 20.5591 20.9368 20.7117 20.8243 20.8243C20.7117 20.9368 20.5591 21 20.4 21H7.6C7.44087 21 7.28826 20.9368 7.17574 20.8243C7.06321 20.7117 7 20.5591 7 20.4V7.6C7 7.44087 7.06321 7.28826 7.17574 7.17574C7.28826 7.06321 7.44087 7 7.6 7H20.4C20.5591 7 20.7117 7.06321 20.8243 7.17574C20.9368 7.28826 21 7.44087 21 7.6Z" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 4H4.6C4.44087 4 4.28826 4.06321 4.17574 4.17574C4.06321 4.28826 4 4.44087 4 4.6V18M7 16.8L12.444 15L21 18M16.5 13C16.1022 13 15.7206 12.842 15.4393 12.5607C15.158 12.2794 15 11.8978 15 11.5C15 11.1022 15.158 10.7206 15.4393 10.4393C15.7206 10.158 16.1022 10 16.5 10C16.8978 10 17.2794 10.158 17.5607 10.4393C17.842 10.7206 18 11.1022 18 11.5C18 11.8978 17.842 12.2794 17.5607 12.5607C17.2794 12.842 16.8978 13 16.5 13Z" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
