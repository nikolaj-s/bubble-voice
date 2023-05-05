import React from 'react'
import { useSelector } from 'react-redux';
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput'
import { selectAccentColor, selectPrimaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./ChannelBackgroundInput.css";

export const ChannelBackgroundInput = ({initialImage, getFile, blur}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor)

    return (
        <div className='channel-background-input-container'>
            <div className='user-stream-image-input-icon-overlay'>
                <div style={{backgroundColor: primaryColor, border: `solid 4px ${accentColor}`}} >
                    <div style={{border: `solid 4px ${accentColor}`}}></div>
                </div>
                <div style={{backgroundColor: primaryColor, border: `solid 4px ${accentColor}`}} >
                    <div style={{border: `solid 4px ${accentColor}`}}></div>
                </div>
            </div>
            <ImageInput showShadow={true} size={950000} blur={true} blur_amount={blur} initalImage={initialImage} getFile={getFile} />
        </div>
    )
}
