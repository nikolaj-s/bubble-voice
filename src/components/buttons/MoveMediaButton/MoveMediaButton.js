import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const MoveMediaButton = ({action, width, height}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper onMouseDown={action} width={width} height={height}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.0833 10.4167V6.25H43.75V22.9167H39.5833V13.3625L28.4083 24.5375C28.0154 24.917 27.4892 25.127 26.9429 25.1222C26.3967 25.1175 25.8741 24.8984 25.4879 24.5121C25.1016 24.1259 24.8825 23.6033 24.8778 23.0571C24.873 22.5108 25.083 21.9846 25.4625 21.5917L36.6375 10.4167H27.0833Z" fill={textColor}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4167 27.0835C9.3116 27.0835 8.25179 27.5225 7.47039 28.3039C6.68899 29.0853 6.25 30.1451 6.25 31.2502V39.5835C6.25 40.6886 6.68899 41.7484 7.47039 42.5298C8.25179 43.3112 9.3116 43.7502 10.4167 43.7502H18.75C19.8551 43.7502 20.9149 43.3112 21.6963 42.5298C22.4777 41.7484 22.9167 40.6886 22.9167 39.5835V31.2502C22.9167 30.1451 22.4777 29.0853 21.6963 28.3039C20.9149 27.5225 19.8551 27.0835 18.75 27.0835H10.4167ZM10.4167 31.2502V39.5835H18.75V31.2502H10.4167Z" fill={textColor}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
