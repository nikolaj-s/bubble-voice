import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const CalenderIcon = ({width = 10, height = 8}) => {

    const color = useSelector(selectTextColor);

    return (
        <svg width={width} height={height} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_131_28)">
<path d="M0.833252 6.33332C0.833252 6.89999 1.37492 7.33332 2.08325 7.33332H7.91659C8.62492 7.33332 9.16659 6.89999 9.16659 6.33332V3.66666H0.833252V6.33332ZM7.91659 1.33332H7.08325V0.99999C7.08325 0.79999 6.91659 0.666656 6.66659 0.666656C6.41659 0.666656 6.24992 0.79999 6.24992 0.99999V1.33332H3.74992V0.99999C3.74992 0.79999 3.58325 0.666656 3.33325 0.666656C3.08325 0.666656 2.91659 0.79999 2.91659 0.99999V1.33332H2.08325C1.37492 1.33332 0.833252 1.76666 0.833252 2.33332V2.99999H9.16659V2.33332C9.16659 1.76666 8.62492 1.33332 7.91659 1.33332Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_131_28">
<rect width={width} height={height} fill={color}/>
</clipPath>
</defs>
</svg>

    )
}
