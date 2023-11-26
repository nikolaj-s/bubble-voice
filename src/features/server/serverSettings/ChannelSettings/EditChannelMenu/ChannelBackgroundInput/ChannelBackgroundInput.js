import React from 'react'
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput'

import "./ChannelBackgroundInput.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ChannelBackgroundInput = ({initialImage, getFile, blur, contain}) => {


    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div className='channel-background-input-container'>
            <div
            style={{backgroundColor: accentColor, marginRight: 5}}
            className='channel-background-side-ctx-prev'>
                {[0,1,2,3,4,5].map(i => {
                    return <div key={i} style={{backgroundColor: primaryColor}} className='block-display'></div>
                })}
            </div>
            <ImageInput contain={contain} position='relative' width='calc(100% - 320px)' backgroundColor={'black'} maxSize={0.7} showShadow={false} size={950000} blur={true} blur_amount={blur} initalImage={initialImage} getFile={getFile} />
            <div 
            style={{backgroundColor: accentColor, marginLeft: 5}}
            className='channel-background-side-ctx-prev'>
                {[0,1,2,3,4,5].map(i => {
                    return <div key={i} style={{height: 45}} className='block-display'>
                        <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: primaryColor}} />
                        <div style={{height: 20, width: 95, borderRadius: 4, backgroundColor: primaryColor}} />
                    </div>
                })}
            </div>
        </div>
    )
}
