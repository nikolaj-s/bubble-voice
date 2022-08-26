// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SideBarHeader } from './sideBarHeader/SideBarHeader';
import { fetchUsersServerList } from './sideBarSlice';

// components
import { ControlBar } from '../controlBar/ControlBar';
import { ServerSelection } from './ServerSelection/ServerSelection';
import { ServerBar } from '../server/ServerBar/ServerBar';
import { AppSettingsMenu } from '../settings/appSettings/AppSettingsMenu';
import { CreateServerButton } from '../createServer/createServerButton/CreateServerButton';

// style
import "./SideBar.css";

export const SideBar = () => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    React.useEffect(() => {
        dispatch(fetchUsersServerList());
    // eslint-disable-next-line
    }, [])

    return (
            <motion.div style={{backgroundColor: secondaryColor}} className='side-bar-container'>
                <SideBarHeader />
                <div className='inner-side-bar-container'>
                    <ServerSelection />
                    <ServerBar />
                    <AppSettingsMenu />
                </div>    
                <ControlBar />
                <CreateServerButton />
            </motion.div>
    )
}
