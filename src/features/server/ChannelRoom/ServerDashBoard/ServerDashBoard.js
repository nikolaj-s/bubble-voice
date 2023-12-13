/// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectGlassColor, selectPrimaryColor, } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectChannelSocialId, selectLoadingServerDetailsState, selectPinningMessage, selectPopularSearches, selectUsersPermissions } from '../../ServerSlice';
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

    const page = useSelector(selectCurrentServerPageState);

    const glassColor = useSelector(selectGlassColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const pins = useSelector(selectPinnedMessages);

    const permission = useSelector(selectUsersPermissions);

    const pinning = useSelector(selectPinningMessage);

    const altLoading = useSelector(selectAltSocialLoading);

    const loadingPins = useSelector(selectLoadingPins);

    const serverLoading = useSelector(selectLoadingServerDetailsState);

    React.useEffect(() => {
        if (serverLoading === false) {
            if (!pins[pins.length - 1]?.no_more_pins) {
            
                dispatch(FetchPins());
                
            }
        }
    // eslint-disable-next-line
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
        style={{backgroundColor: primaryColor}}
        className='server-dashboard-container'>
            <div style={{backgroundColor: glassColor, 
                }} className='server-dashboard-inner-container'>
                {loadingPins || serverLoading ? <MessagePlaceHolderLoader /> : null}
                <AnimatePresence>
                    {page === 'activity' && !socialOpen ? <ActivityBoard loading={serverLoading} key={'server-activity'} /> : null}
                    {page === 'pins' && !socialOpen ? <Pins initLoading={loadingPins || serverLoading} key={'server-pins'} handlePin={handlePin} pins={pins} permission={permission} /> : null}
                    {page === 'media' && !socialOpen ? <ServerMedia key={'server-media'} media={media} expand={expand} /> : null}
                </AnimatePresence>
                
            </div>
            <Loading loading={pinning || altLoading} />
        </div>}
        </>
    )
}
