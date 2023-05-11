import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const PlaceBehindButton = ({width, height, action, description, desc_space, active}) => {
    
    const textColor = useSelector(selectTextColor);
    
    return (
        <ButtonAnimationWrapper 
        width={width}
        height={height}
        action={action}
        description={description}
        desc_space={desc_space}
        zIndex={5}
        >
            <svg style={{rotate: active ? '180deg' : null}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5001 3C19.5001 3.19891 19.4211 3.38968 19.2804 3.53033C19.1398 3.67098 18.949 3.75 18.7501 3.75C16.5628 3.75248 14.4658 4.62247 12.9192 6.16911C11.3726 7.71575 10.5026 9.81273 10.5001 12V15.75H14.2501C14.3985 15.7499 14.5436 15.7938 14.6671 15.8762C14.7905 15.9586 14.8868 16.0758 14.9436 16.2129C15.0004 16.35 15.0152 16.5009 14.9862 16.6465C14.9573 16.792 14.8857 16.9257 14.7807 17.0306L10.2807 21.5306C10.2111 21.6004 10.1284 21.6557 10.0373 21.6934C9.94626 21.7312 9.84866 21.7506 9.7501 21.7506C9.65154 21.7506 9.55395 21.7312 9.4629 21.6934C9.37185 21.6557 9.28913 21.6004 9.21948 21.5306L4.71948 17.0306C4.61447 16.9257 4.54294 16.792 4.51396 16.6465C4.48497 16.5009 4.49982 16.35 4.55664 16.2129C4.61345 16.0758 4.70967 15.9586 4.83312 15.8762C4.95656 15.7938 5.10168 15.7499 5.2501 15.75H9.0001V12C9.00283 9.41498 10.0309 6.93661 11.8588 5.10872C13.6867 3.28084 16.1651 2.25273 18.7501 2.25C18.949 2.25 19.1398 2.32902 19.2804 2.46967C19.4211 2.61032 19.5001 2.80109 19.5001 3Z" fill={textColor}/>
</svg>

        </ButtonAnimationWrapper>
    )
}
