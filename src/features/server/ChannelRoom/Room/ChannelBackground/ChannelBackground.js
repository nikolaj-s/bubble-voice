import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image'
import {  selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./ChannelBackground.css";

export const ChannelBackground = ({channel_background}) => {

    const secondaryColor = useSelector(selectSecondaryColor)

    return (
        <>
        {channel_background ?
        <div 
        style={{
            border: `10px solid ${secondaryColor}`
        }}
        className='channel-background-container'>
            <div className='channel-background-blur-layer'></div>
            <div className='channel-background-image-wrapper'>
                <Image objectFit='cover' image={channel_background} />
            </div>
        </div>
        : null}
        </>
    )
}
