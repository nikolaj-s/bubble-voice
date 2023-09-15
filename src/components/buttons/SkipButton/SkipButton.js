import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SkipButton = ({action, width = 35, height = 35, transparent}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper 
        description={"Skip"}
        width={width} height={height}
        action={action} transparent={transparent}>
            <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_2269_52)">
<path fillRule="evenodd" clipRule="evenodd" d="M9.512 6.05595L1.693 0.655955C1.297 0.406955 0.815 0.473955 0.467 0.736955C0.325774 0.84037 0.21021 0.974865 0.129235 1.13005C0.0482613 1.28524 0.0040442 1.45696 0 1.63195L0 12.332V12.337C0 13.221 0.979 13.793 1.693 13.341L9.513 7.97395C10.163 7.53495 10.163 6.49395 9.513 6.05495L9.512 6.05595ZM13.75 1.74195C13.75 1.47674 13.6446 1.22238 13.4571 1.03485C13.2696 0.847312 13.0152 0.741955 12.75 0.741955C12.4848 0.741955 12.2304 0.847312 12.0429 1.03485C11.8554 1.22238 11.75 1.47674 11.75 1.74195V12.258C11.75 12.5232 11.8554 12.7775 12.0429 12.9651C12.2304 13.1526 12.4848 13.258 12.75 13.258C13.0152 13.258 13.2696 13.1526 13.4571 12.9651C13.6446 12.7775 13.75 12.5232 13.75 12.258V1.74195Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_2269_52">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>


        </ButtonAnimationWrapper>
    )
}
