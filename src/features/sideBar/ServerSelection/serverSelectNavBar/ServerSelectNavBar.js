// library's
import React from 'react';
import { SearchButton } from '../../../../components/buttons/SearchButton/SearchButton';
import { ServerListButton } from '../../../../components/buttons/serverListButton/ServerListButton';

// style's
import "./ServerSelectNavBar.css";

export const ServerSelectNavBar = ({toggle_1, toggle_2, toggle_1_state, toggle_2_state}) => {



    return (
        <div className='server-select-nav-bar-container' >
            <ServerListButton active={toggle_1_state} action={toggle_1} />
            <SearchButton active={toggle_2_state} action={toggle_2} />
        </div>
    )
}
