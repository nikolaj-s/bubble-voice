import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const AltDownIcon = ({flip, altFlip, opacity = 1}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <svg 
        style={{
            transition: '0.1s',
            rotate: altFlip ? flip ? '-90deg' : '0deg' : flip ? '180deg' : '0deg',
            opacity: opacity
        }}
        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2233_6)">
<path fillRule="evenodd" clipRule="evenodd" d="M13.0599 16.06C12.7787 16.3409 12.3974 16.4987 11.9999 16.4987C11.6024 16.4987 11.2212 16.3409 10.9399 16.06L5.2819 10.404C5.00064 10.1226 4.84268 9.74102 4.84277 9.34316C4.84287 8.9453 5.00101 8.56377 5.2824 8.28251C5.56379 8.00125 5.9454 7.84329 6.34325 7.84338C6.74111 7.84348 7.12264 8.00162 7.4039 8.28301L11.9999 12.879L16.5959 8.28301C16.8787 8.00964 17.2575 7.85827 17.6508 7.8615C18.0441 7.86473 18.4204 8.0223 18.6986 8.30028C18.9769 8.57827 19.1348 8.95441 19.1384 9.34771C19.142 9.741 18.991 10.12 18.7179 10.403L13.0609 16.061L13.0599 16.06Z" fill={textColor}/>
</g>
<defs>
<clipPath id="clip0_2233_6">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

    )
}
