import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const PauseButton = ({action, width = 35, height = 35}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        description={"Pause"}
        action={action}
        width={width} height={height}
        >
            <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.5 5.4375C22.4807 5.4375 5.4375 22.4807 5.4375 43.5C5.4375 64.5193 22.4807 81.5625 43.5 81.5625C64.5193 81.5625 81.5625 64.5193 81.5625 43.5C81.5625 22.4807 64.5193 5.4375 43.5 5.4375ZM43.5 75.1055C26.049 75.1055 11.8945 60.951 11.8945 43.5C11.8945 26.049 26.049 11.8945 43.5 11.8945C60.951 11.8945 75.1055 26.049 75.1055 43.5C75.1055 60.951 60.951 75.1055 43.5 75.1055ZM36.0234 29.9062H31.9453C31.5715 29.9062 31.2656 30.2121 31.2656 30.5859V56.4141C31.2656 56.7879 31.5715 57.0938 31.9453 57.0938H36.0234C36.3973 57.0938 36.7031 56.7879 36.7031 56.4141V30.5859C36.7031 30.2121 36.3973 29.9062 36.0234 29.9062ZM55.0547 29.9062H50.9766C50.6027 29.9062 50.2969 30.2121 50.2969 30.5859V56.4141C50.2969 56.7879 50.6027 57.0938 50.9766 57.0938H55.0547C55.4285 57.0938 55.7344 56.7879 55.7344 56.4141V30.5859C55.7344 30.2121 55.4285 29.9062 55.0547 29.9062Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
