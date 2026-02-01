import React from 'react';

import ServerWelcomeMessage from '../../../components/Headers/ServerWelcomeMessage/ServerWelcomeMessage';

import { useDispatch, useSelector } from 'react-redux';

import { ServerRecommendations } from './ServerRecommendations/ServerRecommendations';

import { Widgets } from '../../../components/Widgets/Widgets';

import { fetchPinnedWidgets } from '../../../features/Widgets/Thunks/fetchPinnedWIdgets';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { RecentPostsFeed } from './RecentPostsFeed/RecentPostsFeed';

export const ServerDashboard = () => {

    const dispatch = useDispatch();

    const {details, server_id,} = useSelector(state => state.serverDetailsSlice);

    const {display_name} = useSelector(state => state.accountSlice.account);

    const {widgets} = useSelector(state => state.pinnedWidgetsSlice);

    const recommendations = ServerRecommendations();

    React.useEffect(() => {

        if (!server_id) return;

        dispatch(fetchPinnedWidgets(server_id))

    }, [server_id, dispatch])
   
    return (
        <ScrollLoadWrapper maxContentWidth={'100%'} style={{backgroundColor: details?.color}}>
            <ServerWelcomeMessage {...details} display_name={display_name} />
            {recommendations}
            {widgets?.length > 0 && (<Widgets widgets={widgets} editing={false} />)}
            <RecentPostsFeed />
        </ScrollLoadWrapper>
    )
}
