import React from 'react';

import "./ServerWelcomeMessage.css";
import { useSelector } from 'react-redux';
import { selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectServerBanner, selectServerName, selectServerWelcomeMessage } from '../../../../ServerSlice';
import { Image } from '../../../../../../components/Image/Image';

export const ServerWelcomeMessage = () => {

    const serverBanner = useSelector(selectServerBanner);

    const textColor = useSelector(selectTextColor);

    const serverName = useSelector(selectServerName);
    
    const glassPrimary = useSelector(selectSecondaryColor)

    const welcomeMessage = useSelector(selectServerWelcomeMessage);

    return (
        <>
        <div className='server-welcome-message-container'>
            {serverBanner ? <Image hideOnError={true} image={serverBanner} /> : null}
            
        </div>
        <div
            style={{ color: textColor, backgroundColor: glassPrimary}}
            className='server-welcome-message-wrapper'>
                <h3>{welcomeMessage?.length === 0 || !welcomeMessage ? `Welcome To ${serverName}` : welcomeMessage}</h3>
        </div>
        </>
    )
}
