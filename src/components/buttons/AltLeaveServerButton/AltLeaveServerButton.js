import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { selectAccentColor, selectTextColor, selectPrimaryColor} from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { clearWidgetOverLay } from '../../../features/server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { playSoundEffect } from '../../../features/settings/soundEffects/soundEffectsSlice';
import { handleLeavingServer } from '../../../features/server/ServerSlice';
import { clearDirectMessages } from '../../../features/Messages/MessagesSlice';
import { clearMedia } from '../../../features/server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';

import { setPinnedMessages } from '../../../features/server/ChannelRoom/ServerDashBoard/ServerDashBoardSlice';
import { clearMessages } from '../../../features/server/SocialSlice';

export const AltLeaveServerButton = ({active}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const handleHover = (bool) => {

        if (!active) return;

        toggleHover(bool)
    }

    const action = () => {

        if (!active) return;

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
        <div 
        onClick={action}
        id='disconnect-from-server-button'
        style={{opacity: !active ? 0.6 : 1, cursor: !active ? 'default' : 'pointer', margin: '7px 0px 0px 0px'}}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='saved-media-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover  ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
                <svg width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8325 30L5.62502 23.75L10.8325 30ZM10.8325 17.5L5.62502 23.75L10.8325 17.5Z" stroke={textColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.75 23.75H25M40 41.25H17.5M40 6.25H17.5M17.5 41.25V31.25M17.5 16.25V6.25M40 41.25V6.25" stroke={textColor} strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </div>
            
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Leave Server</h2>
            </div>
            : null}
        </div>
    )
}