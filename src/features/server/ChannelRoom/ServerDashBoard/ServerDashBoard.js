// library's
import React from 'react'
import { useSelector } from 'react-redux';
import {  useRoutes } from 'react-router'

import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId } from '../../ServerSlice';
// style
import "./ServerDashBoard.css";

const Component = () => {

    const textColor = useSelector(selectTextColor)

    const socialOpen = useSelector(selectChannelSocialId)
    
    return (
        <>
        {socialOpen ? null :
        <div className='server-dashboard-container'>
            <div className='server-dashboard-inner-container'>
                
            </div>
        </div>}
        </>
    )
}


export const ServerDashBoard = () => useRoutes([
    {path: "/", element: <Component />}
])