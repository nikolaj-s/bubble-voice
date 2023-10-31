import React from 'react';

import "./ServerWelcomeMessage.css";
import { useSelector } from 'react-redux';
import { selectGlassPrimaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectServerBanner, selectServerName, selectServerWelcomeMessage } from '../../../../ServerSlice';
import { Image } from '../../../../../../components/Image/Image';

export const ServerWelcomeMessage = () => {

    const serverBanner = useSelector(selectServerBanner);

    const textColor = useSelector(selectTextColor);

    const serverName = useSelector(selectServerName);
    
    const glassPrimary = useSelector(selectGlassPrimaryColor)

    const welcomeMessage = useSelector(selectServerWelcomeMessage);

    return (
        <div className='server-welcome-message-container'>
            {serverBanner ? <Image hideOnError={true} image={serverBanner} /> : null}
            <div
            style={{backgroundColor: glassPrimary, color: textColor}}
            className='server-welcome-message-wrapper'>
                <h3>{welcomeMessage}</h3>
            </div>
        </div>
    )
}
