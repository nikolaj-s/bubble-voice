import React from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { WidgetMenu } from './ChannelSettings/WidgetMenu/WidgetMenu'
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { BanList } from './BanList/BanList'
import { ChannelSettings } from './ChannelSettings/ChannelSettings'
import { EditChannelMenu } from './ChannelSettings/EditChannelMenu/EditChannelMenu'
import { DeleteServer } from './DeleteServer.js/DeleteServer'
import { Members } from './Members/Members'
import { OverView } from './OverView/OverView'
import { PermissionGroups } from './PermissionGroups/PermissionGroups'
import { CloseSettings } from '../../../components/CloseSettings/CloseSettings'

const Wrapper = () => {

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div 
        style={{
            backgroundColor: secondaryColor
        }}
        className='server-settings-route-wrapper'>
            <div className='server-settings-wrapping-container'>
                <OverView />
                <Members />
                <ChannelSettings />
                <EditChannelMenu />
                <WidgetMenu />
                <PermissionGroups />
                <BanList />
                <DeleteServer />
                <CloseSettings />
            </div>
        </div>
    )
}


export const ServerSettingsRouteWrapper = () => useRoutes([
    {path: "/server-settings/*", element: <Wrapper />},
    {path: "/create-channel-menu/server-settings/*", element: <Wrapper />},
    {path: "/channel/:id/server-settings/*", element: <Wrapper />},
    {path: "/channel/:id/create-channel-menu/server-settings/*", element: <Wrapper />}
])