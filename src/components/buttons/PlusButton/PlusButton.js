import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const PlusButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.125 10.25V4M4 7.125H10.25" stroke={color} strokeWidth="2.13" strokeLinecap="round"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
