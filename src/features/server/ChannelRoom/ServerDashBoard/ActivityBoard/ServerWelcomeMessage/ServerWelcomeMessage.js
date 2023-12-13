import React from 'react';

import "./ServerWelcomeMessage.css";
import { useSelector } from 'react-redux';
import { selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectServerBanner, selectServerName, selectServerWelcomeMessage } from '../../../../ServerSlice';

export const ServerWelcomeMessage = () => {

    const textColor = useSelector(selectTextColor);

    const serverName = useSelector(selectServerName);
    
    const glassPrimary = useSelector(selectSecondaryColor)

    const welcomeMessage = useSelector(selectServerWelcomeMessage);

    return (
        <>
        <div
            style={{ color: textColor, backgroundColor: glassPrimary}}
            className='server-welcome-message-wrapper'>
                <h3>{welcomeMessage?.length === 0 || !welcomeMessage ? `Welcome To ${serverName}` : welcomeMessage}</h3>
        </div>
        </>
    )
}
