// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { fetchUsersServerList } from './sideBarSlice';

// components
import { ControlBar } from '../controlBar/ControlBar';
import { ServerBar } from '../server/ServerBar/ServerBar';
import { AppSettingsMenu } from '../settings/appSettings/AppSettingsMenu';

// style
import "./SideBar.css";
import { selectCurrentChannelId } from '../server/ServerSlice';

export const SideBar = () => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const channel = useSelector(selectCurrentChannelId);

    React.useEffect(() => {
        dispatch(fetchUsersServerList());
    // eslint-disable-next-line
    }, [])

    return (
        <>
            <motion.div className='side-bar-container'>
                <div style={{height: 'calc(100% - 46px)',}} className='inner-side-bar-container'>
                    <ServerBar />
                    <AppSettingsMenu />
                    {window.location.hash === '#/dashboard' ? <div style={{backgroundColor: glass ? glassColor : secondaryColor}} className='side-bar-dashboard-placeholder'></div> : null}
                </div>    
                
            </motion.div>
            <ControlBar />
        </>
    )
}
