import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useRoutes } from 'react-router'
import { ServerSettingsRouteWrapper } from '../serverSettings/ServerSettingsRouteWrapper'
import { closeServerErrorMessage, selectServerErrorMessage, selectServerErrorState } from '../ServerSlice'
import { CreateChannelMenu } from './CreateChannelMenu/CreateChannelMenu'
import { Room } from './Room/Room'
import { Error } from '../../../components/Error/Error';
import { AnimatePresence } from 'framer-motion'
import { SocialRoute } from './SocialRoute/SocialRoute'
import { ServerDashBoard } from './ServerDashBoard/ServerDashBoard'

export const RoomWrapper = () => {

    const dispatch = useDispatch();

    const error = useSelector(selectServerErrorState);

    const errorMessage = useSelector(selectServerErrorMessage);

    const closeErrorMessage = () => {
        dispatch(closeServerErrorMessage());
    }

    return (
        <>
        <CreateChannelMenu />
        <ServerSettingsRouteWrapper />
        <Room />
        <ServerDashBoard />
        <AnimatePresence exitBeforeEnter>
            <SocialRoute key={'social-route'} />
            {error ? <Error errorMessage={errorMessage} action={closeErrorMessage} /> : null}
        </AnimatePresence>
        </>
    )
}


export const ChannelRoom = () => useRoutes([
    {path: "server/:id/*", element: <RoomWrapper />}
])