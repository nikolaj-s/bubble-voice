import React from 'react'
import { SettingsHeader } from '../../../../titles/SettingsHeader/SettingsHeader';
import { ToggleButton } from '../../../../buttons/ToggleButton/ToggleButton';
import { InputTitle } from '../../../../titles/inputTitle/InputTitle';
import { AltCloseButton } from '../../../../buttons/AltCloseButton/AltCloseButton';

import "./MediaSettings.css";
import { useDispatch, useSelector } from 'react-redux';
import { miscSettingsChannelSpecificStateChange, selectDisableMediaWidget } from '../../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectServerMembers } from '../../../../../features/server/ServerSlice';

export const MediaSettings = ({secondaryColor, close}) => {

    const dispatch = useDispatch();

    const [locked, toggleLocked] = React.useState(false);

    const disableMediaWidget = useSelector(selectDisableMediaWidget);

    const handleDisableMedia = () => {

        dispatch(miscSettingsChannelSpecificStateChange('disableMediaWidget'));
    
    }

    return (
        <div style={{backgroundColor: secondaryColor}} className='media-settings-container'>
            <SettingsHeader title={"Media Player Settings"} />
            
            <InputTitle title={"Hide Video Player"} />
            <ToggleButton state={disableMediaWidget} action={handleDisableMedia} />
            <div className='close-media-settings-wrapper'>
                <AltCloseButton invert={true} width={20} height={20} padding={5} action={close} />
            </div>
        </div>
    )
}
