/// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useRoutes } from 'react-router'

import { selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectPinningMessage, selectPopularSearches, selectUsersPermissions, togglePinMessage } from '../../ServerSlice';
import { selectPinnedMessages } from './ServerDashBoardSlice';

// style
import "./ServerDashBoard.css";
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { Pins } from './Pins/Pins';
import { ServerMedia } from './ServerMedia/ServerMedia';
import { setExpandedContent } from '../../../ExpandContent/ExpandContentSlice';
import { selectCurrentServerPageState } from '../ServerNavigation/ServerNavigationSlice';

export const ServerDashBoard = () => {

    const dispatch = useDispatch();

    const media = useSelector(selectPopularSearches);

    const socialOpen = useSelector(selectChannelSocialId)

    const glass = useSelector(selectGlassState);

    const page = useSelector(selectCurrentServerPageState);

    const glassColor = useSelector(selectGlassColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const pins = useSelector(selectPinnedMessages);

    const permission = useSelector(selectUsersPermissions);

    const pinning = useSelector(selectPinningMessage);

    const inChannel = useSelector(selectCurrentChannelId);
    
    const handlePin = (data) => {
        dispatch(togglePinMessage(data));
    }

    const expand = (img) => {
        dispatch(setExpandedContent(img))
    }

    return (
        <>
        {socialOpen || (page !== 'pins' && page  !== 'media') ? null :
        <div className='server-dashboard-container'>
            <div style={{backgroundColor: inChannel ? null : glass ? glassColor : secondaryColor}} className='server-dashboard-inner-container'>
                {page === 'pins' ? <Pins key={'server-pins'} handlePin={handlePin} pins={pins} permission={permission} /> : null}
                {page === 'media' ? <ServerMedia key={'server-media'} media={media} expand={expand} /> : null}
            </div>
            <Loading loading={pinning} />
        </div>}
        </>
    )
}
