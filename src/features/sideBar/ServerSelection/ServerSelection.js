// library's
import React from 'react';
import {animate, motion, useAnimation} from 'framer-motion';
import { useNavigate, useRoutes } from 'react-router';
import { useDispatch } from 'react-redux';

// components
import { ServerSelectNavBar } from './serverSelectNavBar/ServerSelectNavBar'
import { ServerList } from './serverList/ServerList'

// style's
import "./ServerSelection.css";
import { setServerName } from '../../server/ServerSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { setSideBarHeader } from '../sideBarSlice';


const Selection = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const animation = useAnimation();

    React.useEffect(() => {
        dispatch(setHeaderTitle("Select Server"))
        dispatch(setSideBarHeader("Servers"))
    }, [])

    const selectServer = (_id, name) => {
        dispatch(setServerName(name))
        navigate(`/dashboard/server/${name}`)
    }

    return (
        <motion.div animate={animation} className='side-bar-inner-container'>
            <ServerSelectNavBar />
            <ServerList selectServer={selectServer} />
        </motion.div>
    )
}


export const ServerSelection = () => useRoutes([
    {path: "/", element: <Selection /> },
    {path: "/createserver", element: <Selection /> }
])