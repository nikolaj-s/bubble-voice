// library's
import React from 'react'
import { useSelector } from 'react-redux';
import {  useRoutes } from 'react-router'
import { TitleWidget } from '../../../../components/widgets/Widgets/TitleWidget/TitleWidget';
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectServerBanner, selectServerName } from '../../ServerSlice';
import { Image } from '../../../../components/Image/Image';
// style
import "./ServerDashBoard.css";

const Component = () => {

    const serverName = useSelector(selectServerName);

    const serverBanner = useSelector(selectServerBanner);

    const textColor = useSelector(selectTextColor)

    return (
        <div className='server-dashboard-container'>
            <div className='server-dashboard-inner-container'>
                <TitleWidget widget={{content: {text: serverName}}} />
                <div className='server-dashboard-image-wrapper'>
                    <Image objectFit='cover' position='relative' image={serverBanner} />
                </div>
            </div>
        </div>
    )
}


export const ServerDashBoard = () => useRoutes([
    {path: "/", element: <Component />}
])