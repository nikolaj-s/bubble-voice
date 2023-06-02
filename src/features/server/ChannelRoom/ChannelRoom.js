import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useRoutes } from 'react-router'
import { ServerSettingsRouteWrapper } from '../serverSettings/ServerSettingsRouteWrapper'
import { closeServerErrorMessage, selectCurrentChannel, selectCurrentChannelId, selectCurrentlyViewChannelSocial, selectHideDefaultNotce, selectServerErrorMessage, selectServerErrorState, selectServerId, selectServerName } from '../ServerSlice'
import { CreateChannelMenu } from './CreateChannelMenu/CreateChannelMenu'
import { Room } from './Room/Room'
import { Error } from '../../../components/Error/Error';
import { AnimatePresence } from 'framer-motion'
import { SocialRoute } from './SocialRoute/SocialRoute'
import { ServerDashBoard } from './ServerDashBoard/ServerDashBoard'
import { UserStatusBar } from './UserStatus/UserStatusBar'
import { selectDefaultServer, selectHideUserStatus } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
import { SetAsDefaultServerNotice } from './SetAsDefaultServerNotice/SetAsDefaultServerNotice'
import { MemberPanel } from './MemberPanel/MemberPanel'
import { ServerNavigation } from './ServerNavigation/ServerNavigation'

import "./ChannelRoom.css";
import { Music } from './Room/Music/Music'
import { selectCurrentServerPageState } from './ServerNavigation/ServerNavigationSlice'
import { RoomActionOverlay } from './Room/RoomActionOverlay/RoomActionOverlay'
import { handleAddingMedia, selectLoadingMusicState } from './Room/Music/MusicSlice'
import { DropOverlay } from '../../../components/DropOverlay/DropOverlay'

export const RoomWrapper = () => {

    const dispatch = useDispatch();

    const [dropState, toggleDropState] = React.useState(false);

    const error = useSelector(selectServerErrorState);

    const errorMessage = useSelector(selectServerErrorMessage);

    const defaultServer = useSelector(selectDefaultServer);

    const serverName = useSelector(selectServerName);

    const serverId = useSelector(selectServerId);

    const hideDefaultNotice = useSelector(selectHideDefaultNotce);

    const currentServerPage = useSelector(selectCurrentServerPageState);

    const channelId = useSelector(selectCurrentChannelId);

    const userStatusHidden = useSelector(selectHideUserStatus);

    const currentChannel = useSelector(selectCurrentChannel);

    const musicLoading = useSelector(selectLoadingMusicState);

    const viewingSocial = useSelector(selectCurrentlyViewChannelSocial);

    const closeErrorMessage = () => {
        dispatch(closeServerErrorMessage());
    }

    const onDrop = async (e) => {

        toggleDropState(false);

        if (channelId && currentServerPage !== 'social' && viewingSocial.error) {
            const data = e.dataTransfer.getData('text/plain');

            if (data.includes('youtube')) {

                if (musicLoading) return;

                const music = currentChannel.widgets.findIndex(w => w.type === 'music');

                if (music !== -1) {
                    dispatch(handleAddingMedia(data));
                }
            } else if (data.startsWith('https')) {
                
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
        <CreateChannelMenu />
        <ServerSettingsRouteWrapper />
        <div style={{width: (channelId && !userStatusHidden) ? 'calc(100% - 185px)' : null, maxWidth: (channelId && !userStatusHidden) ? 'calc(100% - 185px)' : null}} className='outer-server-page-wrapper'>
            <div onDragOver={onDragOver} onDrop={onDrop} className='server-page-wrapper'>
                <SocialRoute key='social-route' />
                
                <Room />
                <ServerDashBoard />
                <RoomActionOverlay page={currentServerPage} />
                <DropOverlay action={() => {toggleDropState(false)}} dropState={dropState} />
            </div>
            <Music />
        </div>
        <UserStatusBar key='user-status-bar' />
        <MemberPanel key='member-panel' />
        {error ? <Error key={'server-error'} errorMessage={errorMessage} action={closeErrorMessage} /> : null}
        <SetAsDefaultServerNotice serverId={serverId} servername={serverName} visible={hideDefaultNotice ? !hideDefaultNotice : (defaultServer?.label === 'Default' && defaultServer?.id === "")} />
        </>
    )
}


export const ChannelRoom = () => useRoutes([
    {path: "server/:id/*", element: <RoomWrapper />}
])