import React from 'react';

import ResponsiveGrid from '../../../components/ui/Wrappers/ResponsiveGrid/ResponsiveGrid';

import ServerWelcomeMessage from '../../../components/Headers/ServerWelcomeMessage/ServerWelcomeMessage';

import { useDispatch, useSelector } from 'react-redux';

import { ServerRecommendations } from './ServerRecommendations/ServerRecommendations';

import { WidgetArray } from '../../../components/Widgets/Widgets';

import { fetchPinnedWidgets } from '../../../features/Widgets/Thunks/fetchPinnedWIdgets';

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
        <ResponsiveGrid>
            <ServerWelcomeMessage {...details} display_name={display_name} />
            {recommendations}
            {widgets?.length > 0 && (WidgetArray(widgets))}
        </ResponsiveGrid>
    )
}
