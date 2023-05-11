import React from 'react'

import "./ChannelIcon.css";
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput';
import { LockedChannelIcon } from '../../../../../../components/Icons/LockedChannelIcon/LockedChannelIcon';
import { TextOnlyIcon } from '../../../../../../components/Icons/TextOnlyIcon/TextOnlyIcon';
import { VoiceEnabledIcon } from '../../../../../../components/Icons/VoiceEnabledIcon/VoiceEnabledIcon';

export const ChannelIcon = ({textOnly, locked, initial, getFile}) => {
    return (
        <div className='channel-icon-container'>
            <ImageInput imageProcessingFontSize={'0.5rem'} maxSize={0.4} getFile={getFile} initalImage={initial} disableIcon={true} maxDimensions={50} borderWidth={2} width='100%' height='100%'  />
            {locked ?
            <LockedChannelIcon />
            :
            textOnly ?
            <TextOnlyIcon />
            :
            <VoiceEnabledIcon />
            }
        </div>
    )
}
