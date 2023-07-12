
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const SocialIcon = ({opacity}) => {

    const color = useSelector(selectTextColor)

    return (
        <svg style={{opacity: opacity}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2071_8)">
<path fillRule="evenodd" clipRule="evenodd" d="M19.0001 3C19.7958 3 20.9375 2.93739 21.5001 3.5C22.0627 4.06261 22.0001 5.20435 22.0001 6V16C22.0001 16.7956 22.0626 17.9374 21.5 18.5C20.9374 19.0626 19.7958 19 19.0001 19H6.00012L4.00012 21.5C3.17612 22.118 2.00012 21.53 2.00012 20.5V6C2.00012 5.20435 1.93739 4.06261 2.5 3.5C3.06261 2.93739 4.20447 3 5.00012 3H19.0001ZM11.0001 12H8.00012C7.73491 12 7.48055 12.1054 7.29302 12.2929C7.10548 12.4804 7.00012 12.7348 7.00012 13C7.00012 13.2652 7.10548 13.5196 7.29302 13.7071C7.48055 13.8946 7.73491 14 8.00012 14H11.0001C11.2653 14 11.5197 13.8946 11.7072 13.7071C11.8948 13.5196 12.0001 13.2652 12.0001 13C12.0001 12.7348 11.8948 12.4804 11.7072 12.2929C11.5197 12.1054 11.2653 12 11.0001 12ZM16.0001 8H8.00012C7.74524 8.00028 7.50009 8.09788 7.31475 8.27285C7.12942 8.44782 7.01789 8.68695 7.00295 8.94139C6.98801 9.19584 7.0708 9.44638 7.23439 9.64183C7.39798 9.83729 7.63003 9.9629 7.88312 9.993L8.00012 10H16.0001C16.255 9.99972 16.5002 9.90212 16.6855 9.72715C16.8708 9.55218 16.9824 9.31305 16.9973 9.05861C17.0122 8.80416 16.9294 8.55362 16.7659 8.35817C16.6023 8.16271 16.3702 8.0371 16.1171 8.007L16.0001 8Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_2071_8">
<rect width="24" height="24" fill={color}/>
</clipPath>
</defs>
</svg>

    )
}
