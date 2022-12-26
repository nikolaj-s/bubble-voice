// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useRoutes } from 'react-router'
import { PinnedIcon } from '../../../../components/Icons/PinnedIcon/PinnedIcon';
import { Message } from '../../../../components/Message/Message';

import { selectPrimaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectPinningMessage, selectUsersPermissions, togglePinMessage } from '../../ServerSlice';
import { selectPinnedMessages } from './ServerDashBoardSlice';

// style
import "./ServerDashBoard.css";
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';

const Component = () => {

    const dispatch = useDispatch();

    const textColor = useSelector(selectTextColor)

    const socialOpen = useSelector(selectChannelSocialId)
    
    const primaryColor = useSelector(selectPrimaryColor);

    const pins = useSelector(selectPinnedMessages);

    const permission = useSelector(selectUsersPermissions);

    const pinning = useSelector(selectPinningMessage)
    
    const handlePin = (data) => {
        dispatch(togglePinMessage(data));
    }

    return (
        <>
        {socialOpen ? null :
        <div className='server-dashboard-container'>
            <div 
            style={{borderBottom: `solid 3px ${primaryColor}`}}
            className='server-dashboard-title-container'>
                <h1 style={{color: textColor}}>Bulletin</h1>
                <PinnedIcon />
            </div>
            <div className='server-dashboard-inner-container'>
                {pins?.map((p, key) => {
                    return <Message persist={true} previous_message={key === 0 ? null : pins[key - 1]} current_message={p} index={key} pinMessage={() => {handlePin(p)}} perm={permission?.user_can_post_channel_social} key={p._id} channel_id={p?.channel_id} id={p._id} message={p.content} pinned={p.pinned} />
                })}
            </div>
            <Loading loading={pinning} />
        </div>}
        </>
    )
}


export const ServerDashBoard = () => useRoutes([
    {path: "/", element: <Component />}
])