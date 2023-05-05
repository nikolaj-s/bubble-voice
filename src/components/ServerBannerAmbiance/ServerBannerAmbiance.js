import React from 'react'
import { useSelector } from 'react-redux'

import { selectServerBannerAmbiance, selectServerId } from '../../features/server/ServerSlice'
 
import "./ServerBannerAmbiance.css";
import { selectServerAmbiance } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ServerBannerAmbiance = () => {

    const serverAmbiance = useSelector(selectServerBannerAmbiance)

    const server = useSelector(selectServerId)

    const disableServerAmbiance = useSelector(selectServerAmbiance);

    return (
        <>
        {(server && disableServerAmbiance === false) ?
        <div style={{boxShadow: `-35px -20px 35px ${serverAmbiance}`}} className='server-banner-ambiance'></div>
        : null}
        </>
    )
}
