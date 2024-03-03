import React from 'react'

import "./ChannelIcon.css";
import { ImageInput } from '../../../../../../components/inputs/ImageInput/ImageInput';
import { LockedChannelIcon } from '../../../../../../components/Icons/LockedChannelIcon/LockedChannelIcon';
import { TextOnlyIcon } from '../../../../../../components/Icons/TextOnlyIcon/TextOnlyIcon';
import { VoiceEnabledIcon } from '../../../../../../components/Icons/VoiceEnabledIcon/VoiceEnabledIcon';
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AltEditIcon } from '../../../../../../components/Icons/AltEditIcon/AltEditIcon';
import { RedditIcon } from '../../../../../../components/Icons/RedditIcon/RedditIcon';
import { AltImageIcon } from '../../../../../../components/Icons/AltImageIcon/AltImageIcon';
import { HistoryIcon } from '../../../../../../components/Icons/HistoryIcon/HistoryIcon';
export const ChannelIcon = ({textOnly, locked, initial, getFile, type}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div style={{borderRadius: '50%'}} className='channel-icon-container'>
            
            <ImageInput  borderRadius='50%' imageProcessingFontSize={'0.5rem'} maxSize={0.4} getFile={getFile} initalImage={initial} disableIcon={true} maxDimensions={50} borderWidth={2} width='100%' height='100%'  />
            {type === 'mediahistory' ?
            <HistoryIcon width={20} height={20} /> :
            type === 'subreddit' ?
            <RedditIcon /> :
            type === 'screenshots' ?
            <AltImageIcon />
            :
            locked ?
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
