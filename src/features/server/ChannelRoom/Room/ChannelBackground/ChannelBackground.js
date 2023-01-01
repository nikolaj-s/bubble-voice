import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image'
import {  selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectHideUserStatus } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import "./ChannelBackground.css";

export const ChannelBackground = ({channel_background, blur = 1}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const hideUserStatus = useSelector(selectHideUserStatus);
    
    return (
        <>
        {channel_background ?
        <div 
        style={{
            border: `3px solid ${secondaryColor}`
        }}
        className='channel-background-container'>
            
            <div 
            style={{borderBottomRightRadius: hideUserStatus ? 10 : 0, opacity: blur}}
            className='channel-background-image-wrapper'>
                <Image objectFit='cover' image={channel_background} />
            </div>
        </div>
        : null}
        </>
    )
}
