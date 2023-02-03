// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { SearchButton } from '../../../../components/buttons/SearchButton/SearchButton';
import { ServerListButton } from '../../../../components/buttons/serverListButton/ServerListButton';
import { selectPrimaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style's
import "./ServerSelectNavBar.css";

export const ServerSelectNavBar = ({toggle_1, toggle_2, toggle_1_state, toggle_2_state}) => {

    const accentColor = useSelector(selectPrimaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div style={{
            borderBottom: `solid 3px ${accentColor}`,
            backgroundColor: primaryColor
        }} className='server-select-nav-bar-container' >
            <ServerListButton active={toggle_1_state} action={toggle_1} />
            <SearchButton active={toggle_2_state} action={toggle_2} />
        </div>
    )
}
