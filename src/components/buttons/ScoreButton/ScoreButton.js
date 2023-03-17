import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ScoreButton = ({action, width, height, padding, description}) => {
    
    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        action={action}
        width={width}
        height={height}
        padding={padding}
        description={description}
        desc_space={10}
        >
            <svg width="100%" height="100%" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.43 5.99977L8.95996 1.15977C8.66996 0.209766 7.32996 0.209766 7.04996 1.15977L5.56996 5.99977H1.11996C0.149959 5.99977 -0.250041 7.24977 0.539959 7.80977L4.17996 10.4098L2.74996 15.0198C2.45996 15.9498 3.53996 16.6998 4.30996 16.1098L7.99996 13.3098L11.69 16.1198C12.46 16.7098 13.54 15.9598 13.25 15.0298L11.82 10.4198L15.46 7.81977C16.25 7.24977 15.85 6.00977 14.88 6.00977H10.43V5.99977Z" fill={color} />
            </svg>
        </ButtonAnimationWrapper>
    )
}
