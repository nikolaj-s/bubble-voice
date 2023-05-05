import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '../../../../../components/Image/Image'
import { selectHideUserStatus } from '../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import "./ChannelBackground.css";
import { selectServerAmbiance } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setServerbannerAmbiance } from '../../../ServerSlice';
import { GetImageColorData } from '../../../../../util/GetImageColorData';

export const ChannelBackground = ({channel_background, blur = 1}) => {

    const hideUserStatus = useSelector(selectHideUserStatus);
    
    const disableServerAmbiance = useSelector(selectServerAmbiance);

    const dispatch = useDispatch();

    const onbackgroundLoad = (e) => {
        try {

            if (disableServerAmbiance) return;
            
            let color = GetImageColorData(e);    
        
            dispatch(setServerbannerAmbiance(color));
            
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
            style={{borderBottomRightRadius: hideUserStatus ? 10 : 0, opacity: blur}}
            className='channel-background-image-wrapper'>
                <Image onLoad={onbackgroundLoad} id={'channel-background-source'} objectFit='cover' image={channel_background} />
            </div>
        </div>
        : null}
        </>
    )
}
