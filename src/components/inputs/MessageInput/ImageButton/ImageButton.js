import React from 'react'
import { ButtonAnimationWrapper } from '../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ImageButton = (props) => {
    
    const color = useSelector(selectTextColor);
    
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.33301 35.4167V39.5834C8.33301 40.6884 8.77199 41.7482 9.5534 42.5297C10.3348 43.3111 11.3946 43.75 12.4997 43.75H37.4997C38.6047 43.75 39.6645 43.3111 40.446 42.5297C41.2274 41.7482 41.6663 40.6884 41.6663 39.5834V35.4167M14.583 18.75L24.9997 8.33337M24.9997 8.33337L35.4163 18.75M24.9997 8.33337V33.3334" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
