import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useRoutes } from 'react-router'
import { ServerSettingsRouteWrapper } from '../serverSettings/ServerSettingsRouteWrapper'
import { selectCurrentChannel, selectCurrentChannelId, selectCurrentlyViewChannelSocial} from '../ServerSlice'

import { Room } from './Room/Room'
import { SocialRoute } from './SocialRoute/SocialRoute'
import { ServerDashBoard } from './ServerDashBoard/ServerDashBoard'
import { UserStatusBar } from './UserStatus/UserStatusBar'
import { selectHideUserStatus } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'


import "./ChannelRoom.css";
import { selectCurrentServerPageState } from './ServerNavigation/ServerNavigationSlice'
import { RoomActionOverlay } from './Room/RoomActionOverlay/RoomActionOverlay'
import { handleAddingMedia, selectLoadingMusicState } from './Room/Music/MusicSlice'
import { DropOverlay } from '../../../components/DropOverlay/DropOverlay'
import { selectUsername } from '../../settings/appSettings/accountSettings/accountSettingsSlice'
import { sendMessage } from '../SocialSlice'

export const RoomWrapper = () => {

    const dispatch = useDispatch();

    const [dropState, toggleDropState] = React.useState(false);

    const currentServerPage = useSelector(selectCurrentServerPageState);

    const channelId = useSelector(selectCurrentChannelId);

    const userStatusHidden = useSelector(selectHideUserStatus);

    const currentChannel = useSelector(selectCurrentChannel);

    const musicLoading = useSelector(selectLoadingMusicState);

    const viewingSocial = useSelector(selectCurrentlyViewChannelSocial);

    const channel = useSelector(selectCurrentChannel);

    const username = useSelector(selectUsername);

    const onDrop = async (e) => {

        toggleDropState(false);
      
       // if ((channel?.locked_media && !channel?.media_auth?.includes(username)) || channel.channel_owner !== username || permissions.server_group_name !== 'Owner') return;

        if (channelId && currentServerPage !== 'social' && viewingSocial.error) {
            const data = e.dataTransfer.getData('text/plain');
            console.log(data)
            if (data.includes('youtube')) {

                if (musicLoading) return;

                const music = currentChannel.widgets.findIndex(w => w.type === 'music');

                if (music !== -1) {
                    dispatch(handleAddingMedia(data));
                }
            } else if (data.startsWith('https')) {
                let local_id = ((Math.random(5 * 32) + 1) * 5) + username

                dispatch(sendMessage({username: username, channel_id: channel._id, local_id: local_id, text: e.dataTransfer.getData('text/plain')}))

            }
        }
    }

    const onDragOver = (e) => {
        
        if (currentServerPage === 'social' || !channelId || viewingSocial?._id) return;

        e.preventDefault(); 
        
        toggleDropState(true);
    }

    return (
        <>
        
        <ServerSettingsRouteWrapper />
        <div style={{width: (channelId && !userStatusHidden) ? 'calc(100% - 188px)' : null, maxWidth: (channelId && !userStatusHidden) ? 'calc(100% - 184px)' : null}} className='outer-server-page-wrapper'>
            <div onDragOver={onDragOver} onDrop={onDrop} className='server-page-wrapper'>
                <SocialRoute key='social-route' />
                
                <Room />
                <ServerDashBoard />
                <RoomActionOverlay page={currentServerPage} />
                <DropOverlay action={() => {toggleDropState(false)}} dropState={dropState} />
                
           </div>
        </div>
        <UserStatusBar key='user-status-bar' />
        
        </>
    )
}


export const ChannelRoom = () => useRoutes([
    {path: "server/:id/*", element: <RoomWrapper />}
])