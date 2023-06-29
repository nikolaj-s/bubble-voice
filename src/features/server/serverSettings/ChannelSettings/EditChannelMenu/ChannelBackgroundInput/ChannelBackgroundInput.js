import React from 'react'
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput'

import "./ChannelBackgroundInput.css";
import { useSelector } from 'react-redux';
import { selectAccentColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ChannelBackgroundInput = ({initialImage, getFile, blur}) => {
    const accentColor = useSelector(selectAccentColor);
    return (
        <div className='channel-background-input-container'>
            <ImageInput backgroundColor={accentColor} maxSize={0.5} showShadow={true} size={950000} blur={true} blur_amount={blur} initalImage={initialImage} getFile={getFile} />
        </div>
    )
}
