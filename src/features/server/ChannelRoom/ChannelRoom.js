import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useRoutes } from 'react-router'
import { ServerSettingsRouteWrapper } from '../serverSettings/ServerSettingsRouteWrapper'
import { closeServerErrorMessage, selectCurrentChannel, selectCurrentChannelId, selectHideDefaultNotce, selectServerErrorMessage, selectServerErrorState, selectServerId, selectServerName } from '../ServerSlice'
import { CreateChannelMenu } from './CreateChannelMenu/CreateChannelMenu'
import { Room } from './Room/Room'
import { Error } from '../../../components/Error/Error';
import { AnimatePresence } from 'framer-motion'
import { SocialRoute } from './SocialRoute/SocialRoute'
import { ServerDashBoard } from './ServerDashBoard/ServerDashBoard'
import { UserStatusBar } from './UserStatus/UserStatusBar'
import { selectDefaultServer } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
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

    const currentChannel = useSelector(selectCurrentChannel);

    const musicLoading = useSelector(selectLoadingMusicState);

    const closeErrorMessage = () => {
        dispatch(closeServerErrorMessage());
    }

    const onDrop = async (e) => {

        toggleDropState(false);

        if (channelId && currentServerPage !== 'social') {
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

        if (currentServerPage === 'social' || !channelId) return;

        e.preventDefault(); 

        toggleDropState(true);
    }

    return (
        <>
        <CreateChannelMenu />
        <ServerSettingsRouteWrapper />
        <div onDragOver={onDragOver} onDrop={onDrop} className='server-page-wrapper'>
            <ServerNavigation />
            <Room />
            <ServerDashBoard />
            <SocialRoute key='social-route' />
            <Music />
            <RoomActionOverlay page={currentServerPage} />
            <DropOverlay action={() => {toggleDropState(false)}} dropState={dropState} />
        </div>
        <AnimatePresence>
            <UserStatusBar key='user-status-bar' />
            <MemberPanel key='member-panel' />
            {error ? <Error key={'server-error'} errorMessage={errorMessage} action={closeErrorMessage} /> : null}
        </AnimatePresence>
        <SetAsDefaultServerNotice serverId={serverId} servername={serverName} visible={hideDefaultNotice ? !hideDefaultNotice : (defaultServer?.label === 'Default' && defaultServer?.id === "")} />
        </>
    )
}


export const ChannelRoom = () => useRoutes([
    {path: "server/:id/*", element: <RoomWrapper />}
])