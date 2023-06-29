import React from 'react'

import "./ChannelIcon.css";
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput';
import { LockedChannelIcon } from '../../../../../../components/Icons/LockedChannelIcon/LockedChannelIcon';
import { TextOnlyIcon } from '../../../../../../components/Icons/TextOnlyIcon/TextOnlyIcon';
import { VoiceEnabledIcon } from '../../../../../../components/Icons/VoiceEnabledIcon/VoiceEnabledIcon';
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AltEditIcon } from '../../../../../../components/Icons/AltEditIcon/AltEditIcon';
export const ChannelIcon = ({textOnly, locked, initial, getFile}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div style={{border: `solid 2px ${textColor}`, borderRadius: 5}} className='channel-icon-container'>
            <div style={{position: 'absolute', top: '-10px', left: '-10px', zIndex: 5}}>
                <AltEditIcon />
            </div>
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
