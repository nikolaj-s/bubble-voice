// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../Image/Image';

// styles
import "./ServerBanner.css";

export const ServerBanner = ({serverName, serverImage}) => {

    const color = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor)

    return (
        <div 
        
        className='server-banner-container' >
            <Image position='absolute' objectFit='cover' image={serverImage} />
            <div 
            style={{backgroundColor: `rgba(${primaryColor.split('(')[1].split(')')[0]}, 0.7)`}}
            className='server-title-overlay'>
                <h2
                style={{color: color}}
                >{serverName}</h2>
            </div>
        </div>
    )
}
