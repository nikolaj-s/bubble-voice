import React from 'react'
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput'

import "./ChannelBackgroundInput.css";

export const ChannelBackgroundInput = ({initialImage, getFile, blur}) => {

    return (
        <div className='channel-background-input-container'>
            <ImageInput maxSize={0.5} showShadow={true} size={950000} blur={true} blur_amount={blur} initalImage={initialImage} getFile={getFile} />
        </div>
    )
}
