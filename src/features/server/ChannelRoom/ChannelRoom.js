import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useRoutes } from 'react-router'
import { ServerSettingsRouteWrapper } from '../serverSettings/ServerSettingsRouteWrapper'
import { closeServerErrorMessage, selectHideDefaultNotce, selectServerErrorMessage, selectServerErrorState, selectServerId, selectServerName } from '../ServerSlice'
import { CreateChannelMenu } from './CreateChannelMenu/CreateChannelMenu'
import { Room } from './Room/Room'
import { Error } from '../../../components/Error/Error';
import { AnimatePresence } from 'framer-motion'
import { SocialRoute } from './SocialRoute/SocialRoute'
import { ServerDashBoard } from './ServerDashBoard/ServerDashBoard'
import { UserStatusBar } from './UserStatusBar/UserStatusBar'
import { selectDefaultServer } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
import { SetAsDefaultServerNotice } from './SetAsDefaultServerNotice/SetAsDefaultServerNotice'
import { MemberPanel } from './MemberPanel/MemberPanel'

export const RoomWrapper = () => {

    const dispatch = useDispatch();

    const error = useSelector(selectServerErrorState);

    const errorMessage = useSelector(selectServerErrorMessage);

    const defaultServer = useSelector(selectDefaultServer);

    const serverName = useSelector(selectServerName);

    const serverId = useSelector(selectServerId);

    const hideDefaultNotice = useSelector(selectHideDefaultNotce);

    const closeErrorMessage = () => {
        dispatch(closeServerErrorMessage());
    }

    return (
        <>
        <CreateChannelMenu />
        <ServerSettingsRouteWrapper />
        <Room />
        <ServerDashBoard />
        <AnimatePresence>
            <SocialRoute key='social-route' />
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