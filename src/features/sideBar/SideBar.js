// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectAccentColor, selectGlassColor, selectGlassState, selectPrimaryColor, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { fetchUsersServerList } from './sideBarSlice';

// components
import { ControlBar } from '../controlBar/ControlBar';
import { ServerBar } from '../server/ServerBar/ServerBar';
import { AppSettingsMenu } from '../settings/appSettings/AppSettingsMenu';

// style
import "./SideBar.css";
import { selectSavedMediaOpenState } from '../SavedMedia/SavedMediaSlice';

export const SideBar = () => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const savedMediaOpen = useSelector(selectSavedMediaOpenState);

    React.useEffect(() => {
        dispatch(fetchUsersServerList());
    // eslint-disable-next-line
    }, [])

    console.log(window.location.hash)

    return (
            <motion.div style={{opacity: savedMediaOpen ? 0 : 1}} className='side-bar-container'>
                <div className='inner-side-bar-container'>
                    <ServerBar />
                    <AppSettingsMenu />
                    {window.location.hash === '#/dashboard' ? <div style={{backgroundColor: glass ? glassColor : secondaryColor}} className='side-bar-dashboard-placeholder'></div> : null}
                </div>    
                <ControlBar />
            </motion.div>
    )
}
