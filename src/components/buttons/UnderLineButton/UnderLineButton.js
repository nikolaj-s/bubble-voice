import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const UnderLineButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 14H14M2.85714 10.5714L4.25 8M4.25 8L7.5 2L10.75 8M4.25 8H10.75M12.1429 10.5714L10.75 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
