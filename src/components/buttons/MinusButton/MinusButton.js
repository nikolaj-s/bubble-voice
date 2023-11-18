import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const MinusButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.875 6H4.125C3.82663 6 3.54048 6.10536 3.3295 6.29289C3.11853 6.48043 3 6.73478 3 7C3 7.26522 3.11853 7.51957 3.3295 7.70711C3.54048 7.89464 3.82663 8 4.125 8H10.875C11.1734 8 11.4595 7.89464 11.6705 7.70711C11.8815 7.51957 12 7.26522 12 7C12 6.73478 11.8815 6.48043 11.6705 6.29289C11.4595 6.10536 11.1734 6 10.875 6Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
