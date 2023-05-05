import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const TogglePreviewButton = ({active, action, width, height, description, transparent, desc_height, padding}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        action={action}
        width={width}
        height={height}
        description={description}
        transparent={transparent}
        desc_space={desc_height}
        padding={padding}
        >
            {active ?
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2901 5.4C12.6701 5.74 12.9901 6.07 13.2301 6.33C13.3959 6.51375 13.4877 6.75248 13.4877 7C13.4877 7.24752 13.3959 7.48625 13.2301 7.67C12.1801 8.8 9.79009 11 7.00009 11H6.60009M3.87009 10.13C2.71172 9.48125 1.66506 8.65067 0.77009 7.67C0.60425 7.48625 0.512451 7.24752 0.512451 7C0.512451 6.75248 0.60425 6.51375 0.77009 6.33C1.82009 5.2 4.21009 3 7.00009 3C8.09986 3.02299 9.1762 3.32216 10.1301 3.87M12.5001 1.5L1.50009 12.5" stroke={textColor} strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.59 8.41C5.21441 8.03665 5.00223 7.52958 5 7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5C7.52958 5.00223 8.03665 5.21441 8.41 5.59M8.74 8C8.56198 8.3043 8.3067 8.55614 8 8.73" stroke={textColor} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>            
            :
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2301 6.33C13.3959 6.51375 13.4877 6.75248 13.4877 7C13.4877 7.24752 13.3959 7.48625 13.2301 7.67C12.1801 8.8 9.79009 11 7.00009 11C4.21009 11 1.82009 8.8 0.77009 7.67C0.60425 7.48625 0.512451 7.24752 0.512451 7C0.512451 6.75248 0.60425 6.51375 0.77009 6.33C1.82009 5.2 4.21009 3 7.00009 3C9.79009 3 12.1801 5.2 13.2301 6.33Z" stroke={textColor} strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z" stroke={textColor} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            }
        </ButtonAnimationWrapper>
    )
}
