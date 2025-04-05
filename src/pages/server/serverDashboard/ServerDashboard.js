import React from 'react';
import ResponsiveGrid from '../../../components/ui/Wrappers/ResponsiveGrid/ResponsiveGrid';
import ServerWelcomeMessage from '../../../components/Headers/ServerWelcomeMessage/ServerWelcomeMessage';
import { useSelector } from 'react-redux';

export const ServerDashboard = () => {

    const {details} = useSelector(state => state.serverDetailsSlice);

    const {display_name} = useSelector(state => state.accountSlice.account);

    return (
        <ResponsiveGrid>
            <ServerWelcomeMessage {...details} display_name={display_name} />
        </ResponsiveGrid>
    )
}
