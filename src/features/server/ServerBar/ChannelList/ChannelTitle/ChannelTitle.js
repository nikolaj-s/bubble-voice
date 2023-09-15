// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// component's
import {DownIcon } from '../../../../../components/Icons/DownIcon/DownIcon'
import { selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// state
import { handleLeavingServer, selectUsersPermissions } from '../../../ServerSlice';

// style's
import "./ChannelTitle.css";
import { DropDownButton } from '../../../../../components/buttons/DropDownButton/DropDownButton';
import { AltDownIcon } from '../../../../../components/Icons/AltDownIcon/AltDownIcon';
import { ServerManageMenu } from '../ServerManageMenu/ServerManageMenu';
import { playSoundEffect } from '../../../../settings/soundEffects/soundEffectsSlice';
import { clearWidgetOverLay } from '../../../ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { clearDirectMessages } from '../../../../Messages/MessagesSlice';
import { clearMedia } from '../../../ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';
import { setPinnedMessages } from '../../../ChannelRoom/ServerDashBoard/ServerDashBoardSlice';
import { clearMessages } from '../../../SocialSlice';

export const ChannelTitle = ({action}) => {

    const permissions = useSelector(selectUsersPermissions);

    const [open, toggleOpen] = React.useState(false);

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const glassColor = useSelector(selectGlassColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const dispatch = useDispatch();

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

    const handleLeave = () => {

        dispatch(playSoundEffect({default: 'disconnected'}));
        
        dispatch(clearWidgetOverLay());
        
        dispatch(handleLeavingServer());

        dispatch(clearDirectMessages());

        dispatch(clearMedia());

        dispatch(setPinnedMessages([]));

        dispatch(clearMessages());

        toggleHover(false);

        window.location.hash = '/dashboard'
    }

    return (
        <>
        <div
        onClick={() => {toggleOpen(!open)}}
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        style={{backgroundColor: hover ? primaryColor : glassColor}} className='channel-title-container'>
            <h3
            style={{color: textColor}}
            >{hover ? "MANAGE" : "CHANNELS"}</h3>
            <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', rotate: open ? '180deg' : '0deg', transition: '0.1s'}}>
                <AltDownIcon />
            </div>
            
        
        </div>
        <ServerManageMenu leaveServer={handleLeave} openAddChannel={action} openServerSettings={toggleServerSettings} permissions={permissions} open={open} />
        </>
    )
}
