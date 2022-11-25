import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const PinButton = ({pinned = false, width, height, action, description}) => {
    
    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper 
        action={action}
        zIndex={2}
        description={description}
        borderRadius='10px' margin={'0 10px 0 0'} width={width} height={height}>
            {!pinned ?
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9V4H17C17.55 4 18 3.55 18 3C18 2.45 17.55 2 17 2H7C6.45 2 6 2.45 6 3C6 3.55 6.45 4 7 4H8V9C8 10.66 6.66 12 5 12V14H10.97V21L11.97 22L12.97 21V14H19V12C17.34 12 16 10.66 16 9Z" fill={color} />
            </svg>
            :
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 9L16 16H13V20L12 23L11 20V16H6V13L9 10V9ZM17 2V4L15 5V10L18 13V15.461L12.27 9.73L9 6.46V5L7 4V2H17Z" fill={color} />
            <path d="M2.27 2.27002L1 3.54002L20.46 23L21.73 21.73L11 11L2.27 2.27002Z" fill={color} />
            </svg>
            }
        </ButtonAnimationWrapper>
    )
}
