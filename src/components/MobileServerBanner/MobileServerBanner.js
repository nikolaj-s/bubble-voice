import React from 'react'
import { useSelector } from 'react-redux'
import { selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Image } from '../Image/Image'

import "./MobileServerBanner.css"

export const MobileServerBanner = ({serverImage, serverName}) => {
    
    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div className='mobile-server-banner-container'>
            <Image zIndex={0} position='absolute' image={serverImage} objectFit="cover" width={'100%'} imgHeight={'100%'} />
            <div style={{backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.5)`}} className='mobile-server-title-container'>
                <h2 style={{color: textColor}}>{serverName}</h2>
            </div>
            <div style={{backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.5)`}} className='mobile-server-navigation-container'>

            </div>
        </div>
    )
}
