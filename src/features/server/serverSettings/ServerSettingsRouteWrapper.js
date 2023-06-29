import React from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { WidgetMenu } from './ChannelSettings/WidgetMenu/WidgetMenu'
import { selectSecondaryColor, selectAccentColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { BanList } from './BanList/BanList'
import { ChannelSettings } from './ChannelSettings/ChannelSettings'
import { EditChannelMenu } from './ChannelSettings/EditChannelMenu/EditChannelMenu'
import { DeleteServer } from './DeleteServer.js/DeleteServer'
import { Members } from './Members/Members'
import { OverView } from './OverView/OverView'
import { PermissionGroups } from './PermissionGroups/PermissionGroups'
import { CloseSettings } from '../../../components/CloseSettings/CloseSettings'
import { motion } from 'framer-motion'

const Wrapper = () => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <motion.div 
        transition={{duration: 0.1}}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        style={{
            backgroundColor: secondaryColor,
            borderTop: `30px solid ${secondaryColor}`,
            borderRight: `8px solid ${secondaryColor}`,
            borderBottom: `8px solid ${secondaryColor}`,
            borderLeft: `solid 5px ${secondaryColor}`
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
        </motion.div>
    )
}


export const ServerSettingsRouteWrapper = () => useRoutes([
    {path: "/server-settings/*", element: <Wrapper />},
    {path: "/create-channel-menu/server-settings/*", element: <Wrapper />},
    {path: "/channel/:id/server-settings/*", element: <Wrapper />},
    {path: "/channel/:id/create-channel-menu/server-settings/*", element: <Wrapper />}
])