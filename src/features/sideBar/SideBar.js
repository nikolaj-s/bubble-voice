// library's
import React from 'react';
import {motion} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SideBarHeader } from './sideBarHeader/SideBarHeader';

// style
import "./SideBar.css";

import { fetchUsersServerList } from './sideBarSlice';
import { ControlBar } from '../controlBar/ControlBar';
import { Route, Routes } from 'react-router-dom';
import { ServerSelection } from './ServerSelection/ServerSelection';
import { ServerBar } from '../server/ServerBar/ServerBar';
import { AppSettingsMenu } from '../settings/appSettings/AppSettingsMenu';
import { CreateServerButton } from '../createServer/createServerButton/CreateServerButton';
export const SideBar = () => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    React.useEffect(() => {
        dispatch(fetchUsersServerList());
    }, [])

    return (
        <motion.div style={{backgroundColor: secondaryColor}} className='side-bar-container'>
            <SideBarHeader />
            <div className='inner-side-bar-container'>
                <ServerSelection />
                <Routes>
                    <Route path='server/:id/*' element={<ServerBar />} />  
                </Routes>
                <AppSettingsMenu />
            </div>    
            <ControlBar />
            <CreateServerButton />
        </motion.div>
    )
}
