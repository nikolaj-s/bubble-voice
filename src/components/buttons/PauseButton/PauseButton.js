import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const PauseButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        {...props}
        description={"Pause"}
        >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 3L7 22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M18 3V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
</svg>

        </ButtonAnimationWrapper>
    )
}
