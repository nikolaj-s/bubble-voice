// library's
import React from 'react';
import { ServerListButton } from '../../../../components/buttons/serverListButton/ServerListButton';

// style's
import "./ServerSelectNavBar.css";

export const ServerSelectNavBar = () => {

    return (
        <div className='server-select-nav-bar-container' >
            <ServerListButton />
        </div>
    )
}
