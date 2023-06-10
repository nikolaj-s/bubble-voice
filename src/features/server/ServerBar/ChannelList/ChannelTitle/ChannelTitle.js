// library's
import React from 'react'
import { useSelector } from 'react-redux';

// component's
import { AddButton } from '../../../../../components/buttons/AddButton/AddButton'
import { SettingsButton } from '../../../../../components/buttons/settingsButton/settingsButton';
import { selectGlassColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// state
import { selectUsersPermissions } from '../../../ServerSlice';

// style's
import "./ChannelTitle.css";

export const ChannelTitle = ({action}) => {

    const permissions = useSelector(selectUsersPermissions);

    const textColor = useSelector(selectTextColor);

    const glassColor = useSelector(selectGlassColor);

    const toggleServerSettings = () => {

        if (window.location.hash.includes('server-settings')) {
           
            window.location.hash = window.location.hash.split('/server-settings')[0]
            
        } else {
            if (window.location.hash.includes('appsettings')) {
                window.location.hash = window.location.hash.split('/appsettings')[0] + "/server-settings/overview"
            } else {
                window.location.hash = window.location.hash + '/server-settings/overview'
            }
            
        }
    }

    return (
        <div style={{backgroundColor: glassColor, backdropFilter: 'blur(3px)'}} className='channel-title-container'>
            <h3
            style={{color: textColor}}
            >CHANNELS</h3>
            <div className='channel-title-buttons-container'>
                {permissions?.user_can_manage_channels ? <AddButton desc_space={15} padding={'6px'} transparent={true} borderRadius={'5px'} description={"Add"} width={15}  height={15} action={action} /> : null}
                <SettingsButton transparent={true} id="server-settings-button" action={toggleServerSettings} description='Edit' desc_space={12} width={19} height={19} padding={4}  />
            </div>
        </div>
    )
}
