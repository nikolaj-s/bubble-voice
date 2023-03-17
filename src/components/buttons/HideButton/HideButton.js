import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const HideButton = ({action, width, height, padding, description, flip_description, desc_space, invert, altInvert, margin, hiddenState}) => {
    
    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        action={action}
        width={width}
        height={height}
        padding={padding}
        description={description}
        flip_description={flip_description}
        desc_space={desc_space}
        invert={invert}
        altInvert={altInvert}
        margin={margin}
        >
            <svg 
            style={{rotate: hiddenState ? '180deg' : '0deg', transition: '0.1s'}}
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.25 20C21.0511 20 20.8603 19.921 20.7197 19.7803C20.579 19.6397 20.5 19.4489 20.5 19.25V4.75C20.5 4.55109 20.579 4.36032 20.7197 4.21967C20.8603 4.07902 21.0511 4 21.25 4C21.4489 4 21.6397 4.07902 21.7803 4.21967C21.921 4.36032 22 4.55109 22 4.75V19.25C22 19.4489 21.921 19.6397 21.7803 19.7803C21.6397 19.921 21.4489 20 21.25 20ZM9.53 18.78C9.46043 18.8497 9.37782 18.9049 9.28688 18.9426C9.19593 18.9803 9.09845 18.9998 9 18.9998C8.90155 18.9998 8.80406 18.9803 8.71312 18.9426C8.62218 18.9049 8.53956 18.8497 8.47 18.78L2.22 12.53C2.15033 12.4604 2.09507 12.3778 2.05736 12.2869C2.01965 12.1959 2.00024 12.0984 2.00024 12C2.00024 11.9016 2.01965 11.8041 2.05736 11.7131C2.09507 11.6222 2.15033 11.5396 2.22 11.47L8.47 5.22C8.5396 5.1504 8.62223 5.09519 8.71316 5.05752C8.8041 5.01985 8.90157 5.00047 9 5.00047C9.09843 5.00047 9.19589 5.01985 9.28683 5.05752C9.37777 5.09519 9.4604 5.1504 9.53 5.22C9.5996 5.2896 9.65481 5.37223 9.69248 5.46317C9.73014 5.5541 9.74953 5.65157 9.74953 5.75C9.74953 5.84843 9.73014 5.9459 9.69248 6.03683C9.65481 6.12777 9.5996 6.2104 9.53 6.28L4.561 11.25L16.75 11.25C16.9489 11.25 17.1397 11.329 17.2803 11.4697C17.421 11.6103 17.5 11.8011 17.5 12C17.5 12.1989 17.421 12.3897 17.2803 12.5303C17.1397 12.671 16.9489 12.75 16.75 12.75H4.561L9.53 17.72C9.59966 17.7896 9.65493 17.8722 9.69264 17.9631C9.73034 18.0541 9.74975 18.1516 9.74975 18.25C9.74975 18.3484 9.73034 18.4459 9.69264 18.5369C9.65493 18.6278 9.59966 18.7104 9.53 18.78Z" fill={color} />
            </svg>
        </ButtonAnimationWrapper>
    )
}
