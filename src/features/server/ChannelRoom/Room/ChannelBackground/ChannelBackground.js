import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image'
import { selectHideUserStatus } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import "./ChannelBackground.css";
import { selectServerAmbiance } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setRoomColor, setServerbannerAmbiance } from '../../../ServerSlice';
import { GetImageColorData } from '../../../../../util/GetImageColorData';

export const ChannelBackground = ({channel_background, blur = 1, glass, glassColor, secondaryColor, contain = false}) => {

    const hideUserStatus = useSelector(selectHideUserStatus);
    
    const disableServerAmbiance = useSelector(selectServerAmbiance);

    const dispatch = useDispatch();

    const onbackgroundLoad = (e) => {
        try {

            if (disableServerAmbiance) return;
            
            let color = GetImageColorData(e);    
            
            dispatch(setRoomColor(color));
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        {channel_background ?
        <div
        className='channel-background-container'>
            
            <div 
            className='channel-background-image-wrapper'>
                <Image zIndex={1} onLoad={onbackgroundLoad} id={'channel-background-source'} objectFit={contain ? 'contain' : 'cover'} image={channel_background} />
                {contain ? 
                <img className='channel-background-contain-blur-effect' src={channel_background} /> 
                : null}
            </div>
        </div>
        : null}
        </>
    )
}
