import React from 'react';

import ResponsiveGrid from '../../../components/ui/Wrappers/ResponsiveGrid/ResponsiveGrid';

import ServerWelcomeMessage from '../../../components/Headers/ServerWelcomeMessage/ServerWelcomeMessage';

import { useSelector } from 'react-redux';

import { ServerRecommendations } from './ServerRecommendations/ServerRecommendations';

export const ServerDashboard = () => {

    const {details, server_id,} = useSelector(state => state.serverDetailsSlice);

    const {display_name} = useSelector(state => state.accountSlice.account);

    const recommendations = ServerRecommendations();

    return (
        <ResponsiveGrid>
            <ServerWelcomeMessage {...details} display_name={display_name} />
            {recommendations}
        </ResponsiveGrid>
    )
}
