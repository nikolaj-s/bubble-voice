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
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4453 11.3374L6.375 2.72998C6.13778 2.58472 5.86608 2.50542 5.58797 2.50027C5.30985 2.49512 5.0354 2.5643 4.79297 2.70068C4.55284 2.83494 4.35281 3.03074 4.21344 3.26794C4.07407 3.50514 4.0004 3.77518 4 4.05029V21.2632C4.00181 21.6759 4.16742 22.0709 4.46041 22.3615C4.75341 22.6522 5.14982 22.8145 5.5625 22.813C5.85054 22.8129 6.13299 22.7335 6.37891 22.5835L20.4453 13.9761C20.6714 13.8383 20.8583 13.6446 20.9879 13.4137C21.1176 13.1829 21.1857 12.9225 21.1857 12.6577C21.1857 12.3929 21.1176 12.1326 20.9879 11.9017C20.8583 11.6708 20.6714 11.4772 20.4453 11.3394V11.3374ZM5.5625 21.2446V4.06299L19.6084 12.6567L5.5625 21.2446Z" fill={color}/>
            <path d="M22.5 2.5V23" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

        </ButtonAnimationWrapper>
    )
}
