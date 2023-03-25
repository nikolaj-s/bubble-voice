/// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useRoutes } from 'react-router'

import { selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectPinningMessage, selectPopularSearches, selectUsersPermissions, togglePinMessage } from '../../ServerSlice';
import { selectPinnedMessages } from './ServerDashBoardSlice';

// style
import "./ServerDashBoard.css";
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { Pins } from './Pins/Pins';
import { AltPinnedButton } from '../../../../components/buttons/AltPinnedButton/AltPinnedButton';
import { ServerMediaButton } from '../../../../components/buttons/ServerMediaButton/ServerMediaButton';
import { ServerMedia } from './ServerMedia/ServerMedia';
import { setExpandedContent } from '../../../ExpandContent/ExpandContentSlice';

const Component = () => {

    const dispatch = useDispatch();

    const [page, setPage] = React.useState("pins");

    const media = useSelector(selectPopularSearches);

    const socialOpen = useSelector(selectChannelSocialId)

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const pins = useSelector(selectPinnedMessages);

    const permission = useSelector(selectUsersPermissions);

    const pinning = useSelector(selectPinningMessage)
    
    const handlePin = (data) => {
        dispatch(togglePinMessage(data));
    }

    const navigate = (page) => {
        setPage(page);
    }

    const expand = (img) => {
        dispatch(setExpandedContent(img))
    }

    return (
        <>
        {socialOpen ? null :
        <div className='server-dashboard-container'>
            <div 
            style={{marginBottom: 1}}
            className='server-dashboard-title-container'>
                <AltPinnedButton transparent={true} action={() => {navigate('pins')}} active={page === 'pins'} />
                <ServerMediaButton transparent={true} action={() => {navigate('media')}} active={page === 'media'} />
                <div className='server-dashboard-title-filler' style={{backgroundColor: glass ? glassColor : secondaryColor}}></div>
            </div>
            <div style={{backgroundColor: glass ? glassColor : secondaryColor}} className='server-dashboard-inner-container'>
                {page === 'pins' ? <Pins key={'server-pins'} handlePin={handlePin} pins={pins} permission={permission} /> : null}
                {page === 'media' ? <ServerMedia key={'server-media'} media={media} expand={expand} /> : null}
            </div>
            <Loading loading={pinning} />
        </div>}
        </>
    )
}


export const ServerDashBoard = () => useRoutes([
    {path: "/", element: <Component />}
])