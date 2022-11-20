import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SkipButton = ({action, width = 35, height = 35}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper 
        width={width} height={height}
        action={action}>
            <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.1191 12.125C38.1191 11.7106 37.9545 11.3132 37.6615 11.0201C37.3685 10.7271 36.971 10.5625 36.5566 10.5625C36.1422 10.5625 35.7448 10.7271 35.4518 11.0201C35.1588 11.3132 34.9941 11.7106 34.9941 12.125V22.275L15.4098 10.9125C13.7848 9.96875 11.5566 11.0469 11.5566 13.0875V36.1625C11.5566 38.2031 13.7848 39.2812 15.4098 38.3375L34.9941 26.975V37.125C34.9941 37.5394 35.1588 37.9368 35.4518 38.2299C35.7448 38.5229 36.1422 38.6875 36.5566 38.6875C36.971 38.6875 37.3685 38.5229 37.6615 38.2299C37.9545 37.9368 38.1191 37.5394 38.1191 37.125V12.125ZM14.6816 14.1031L32.8191 24.625L14.6816 35.1469V14.1031Z" fill={color} />
            </svg>
        </ButtonAnimationWrapper>
    )
}
