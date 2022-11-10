import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const AddButton = ({action, width = 30, height = 30, margin, description}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper description={description} margin={margin} width={width} height={height} action={action}>
            <svg 
            width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5625 2.59375C20.5625 1.97215 20.3156 1.37601 19.876 0.936468C19.4365 0.49693 18.8404 0.25 18.2188 0.25C17.5971 0.25 17.001 0.49693 16.5615 0.936468C16.1219 1.37601 15.875 1.97215 15.875 2.59375V15.875H2.59375C1.97215 15.875 1.37601 16.1219 0.936468 16.5615C0.49693 17.001 0.25 17.5971 0.25 18.2188C0.25 18.8404 0.49693 19.4365 0.936468 19.876C1.37601 20.3156 1.97215 20.5625 2.59375 20.5625H15.875V33.8438C15.875 34.4654 16.1219 35.0615 16.5615 35.501C17.001 35.9406 17.5971 36.1875 18.2188 36.1875C18.8404 36.1875 19.4365 35.9406 19.876 35.501C20.3156 35.0615 20.5625 34.4654 20.5625 33.8438V20.5625H33.8438C34.4654 20.5625 35.0615 20.3156 35.501 19.876C35.9406 19.4365 36.1875 18.8404 36.1875 18.2188C36.1875 17.5971 35.9406 17.001 35.501 16.5615C35.0615 16.1219 34.4654 15.875 33.8438 15.875H20.5625V2.59375Z" fill={color} fillOpacity="0.5"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
