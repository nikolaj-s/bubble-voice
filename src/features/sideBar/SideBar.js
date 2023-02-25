// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectAccentColor, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { fetchUsersServerList } from './sideBarSlice';

// components
import { ControlBar } from '../controlBar/ControlBar';
import { ServerBar } from '../server/ServerBar/ServerBar';
import { AppSettingsMenu } from '../settings/appSettings/AppSettingsMenu';

// style
import "./SideBar.css";

export const SideBar = () => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    React.useEffect(() => {
        dispatch(fetchUsersServerList());
    // eslint-disable-next-line
    }, [])

    return (
            <motion.div style={{backgroundColor: secondaryColor}} className='side-bar-container'>
                <div style={{backgroundColor: accentColor, height: 32, width: '100%', position: 'absolute'}} ></div>
                <div className='inner-side-bar-container'>
                    <ServerBar />
                    <AppSettingsMenu />
                </div>    
                <ControlBar />
            </motion.div>
    )
}
