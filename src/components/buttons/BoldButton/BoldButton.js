import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const BoldButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.67498 0.75C8.47498 0.75 9.82498 0.975 10.725 1.5C11.7 2.025 12.15 2.925 12.15 4.2C12.15 4.95 11.925 5.625 11.625 6.15C11.4549 6.40645 11.234 6.62529 10.976 6.79299C10.718 6.9607 10.4284 7.07369 10.125 7.125C10.5537 7.22515 10.9604 7.40309 11.325 7.65C11.625 7.875 11.925 8.25 12.15 8.625C12.3847 9.16827 12.4875 9.75938 12.45 10.35C12.4765 10.8918 12.3749 11.4323 12.1533 11.9275C11.9318 12.4227 11.5966 12.8586 11.175 13.2C10.1073 13.9625 8.80931 14.3334 7.49998 14.25H2.47498V0.75H6.67498ZM6.97498 6.075C7.79998 6.075 8.39998 6 8.69998 5.7C9.07498 5.475 9.22498 5.025 9.22498 4.575C9.22498 4.05 8.99998 3.675 8.62498 3.45C8.24998 3.225 7.64998 3.075 6.82498 3.075H5.32498V6.075H6.97498ZM5.32498 8.325V12H7.19998C8.02498 12 8.69998 11.775 8.99998 11.475C9.37498 11.1 9.52498 10.725 9.52498 10.125C9.53391 9.8983 9.49131 9.67252 9.40038 9.46467C9.30944 9.25681 9.17254 9.07229 8.99998 8.925C8.62498 8.625 8.02498 8.475 7.12498 8.475H5.24998L5.32498 8.325Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
