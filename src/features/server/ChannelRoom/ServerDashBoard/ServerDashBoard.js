/// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectCurrentChannelId, selectLoadingServerDetailsState, selectPinningMessage, selectPopularSearches, selectUsersPermissions } from '../../ServerSlice';
import { FetchPins, selectLoadingPins, selectPinnedMessages } from './ServerDashBoardSlice';

// style
import "./ServerDashBoard.css";
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { Pins } from './Pins/Pins';
import { ServerMedia } from './ServerMedia/ServerMedia';
import { setExpandedContent } from '../../../ExpandContent/ExpandContentSlice';
import { selectCurrentServerPageState } from '../ServerNavigation/ServerNavigationSlice';
import { selectAltSocialLoading, togglePinMessage } from '../../SocialSlice';
import { MessagePlaceHolderLoader } from '../../../../components/MessagePlaceHolderLoader/MessagePlaceHolderLoader';
import { AnimatePresence } from 'framer-motion';
import { ActivityBoard } from './ActivityBoard/ActivityBoard'

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

    const altLoading = useSelector(selectAltSocialLoading);

    const inChannel = useSelector(selectCurrentChannelId);

    const loadingPins = useSelector(selectLoadingPins);

    const serverLoading = useSelector(selectLoadingServerDetailsState);

    React.useEffect(() => {
        if (serverLoading === false) {
            if (!pins[pins.length - 1]?.no_more_pins) {
            
                dispatch(FetchPins());
                
            }
        }
    }, [serverLoading])
    
    const handlePin = (data) => {
        dispatch(togglePinMessage(data));
    }

    const expand = (img) => {
        dispatch(setExpandedContent(img))
    }
    
    return (
        <>
        {(page !== 'pins' && page  !== 'media' && page !== 'activity') ? null :
        <div 
        style={{borderTop: `solid 4px ${glass ? glassColor : secondaryColor}`,
        borderRight: `solid 4px ${glass ? glassColor : secondaryColor}`,
        borderBottom: `solid 4px ${glass ? glassColor : secondaryColor}`}}
        className='server-dashboard-container'>
            <div style={{backgroundColor: glass ? glassColor : secondaryColor, 
                }} className='server-dashboard-inner-container'>
                {loadingPins || serverLoading ? <MessagePlaceHolderLoader /> : null}
                <AnimatePresence>
                    {page === 'activity' && !socialOpen ? <ActivityBoard key={'server-activity'} /> : null}
                    {page === 'pins' && !socialOpen ? <Pins initLoading={loadingPins || serverLoading} key={'server-pins'} handlePin={handlePin} pins={pins} permission={permission} /> : null}
                    {page === 'media' && !socialOpen ? <ServerMedia key={'server-media'} media={media} expand={expand} /> : null}
                </AnimatePresence>
                
            </div>
            <Loading loading={pinning || altLoading} />
        </div>}
        </>
    )
}
