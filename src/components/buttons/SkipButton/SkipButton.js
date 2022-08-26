import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SkipButton = ({action}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper action={action}>
            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.1191 2.125C27.1191 1.7106 26.9545 1.31317 26.6615 1.02015C26.3685 0.72712 25.971 0.5625 25.5566 0.5625C25.1422 0.5625 24.7448 0.72712 24.4518 1.02015C24.1588 1.31317 23.9941 1.7106 23.9941 2.125V12.275L4.40977 0.9125C2.78477 -0.03125 0.556641 1.04688 0.556641 3.0875V26.1625C0.556641 28.2031 2.78477 29.2812 4.40977 28.3375L23.9941 16.975V27.125C23.9941 27.5394 24.1588 27.9368 24.4518 28.2299C24.7448 28.5229 25.1422 28.6875 25.5566 28.6875C25.971 28.6875 26.3685 28.5229 26.6615 28.2299C26.9545 27.9368 27.1191 27.5394 27.1191 27.125V2.125ZM3.68164 4.10312L21.8191 14.625L3.68164 25.1469V4.10312Z" fill={color} />
            </svg>
        </ButtonAnimationWrapper>
    )
}
