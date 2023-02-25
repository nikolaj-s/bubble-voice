// library's
import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { useNavigate, useRoutes } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';

// components
import { ServerList } from './serverList/ServerList'

// style's
import "./ServerSelection.css";
import { handleLeavingServer, selectServerId, setServerId, setServerName, setTopPos } from '../../server/ServerSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { selectLoadingUsersServersState, selectServerList, setSideBarHeader } from '../sideBarSlice';
import { selectAccentColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { clearWidgetOverLay } from '../../server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { socket } from '../../server/ServerBar/ServerBar';

export const ServerSelection = () => {
  
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const accentColor = useSelector(selectAccentColor);

    // handle users server list
    const serverList = useSelector(selectServerList);

    const currentServer = useSelector(selectServerId);

    const loadingUserServerListState= useSelector(selectLoadingUsersServersState);

    const selectServer = (_id, name, top_pos) => {
        
        if (_id === currentServer) return;

        if (currentServer) {

            dispatch(playSoundEffect("disconnected"));

            dispatch(clearWidgetOverLay());

            dispatch(handleLeavingServer());

            navigate('/dashboard');

            socket?.disconnect();
            
            setTimeout(() => {
                dispatch(setServerId(_id));

                dispatch(setTopPos(top_pos));
        
                dispatch(setServerName(name));
        
                setTimeout(() => {
        
                    navigate(`/dashboard/server/${name}`)
                
                }, 5)
            }, 100)

        } else {
            dispatch(setServerId(_id));

            dispatch(setTopPos(top_pos));
    
            dispatch(setServerName(name));
    
            setTimeout(() => {
    
                navigate(`/dashboard/server/${name}`)
            
            }, 5)
        }

       
            
    }

    React.useEffect(() => {
        dispatch(setHeaderTitle("Select Server"))
        dispatch(setSideBarHeader("Servers"))
    // eslint-disable-next-line   
    }, [])

    return (
        <div style={{backgroundColor: accentColor}} className='side-bar-inner-container'>
            <AnimatePresence >
                <div className='server-list-outer-wrapper'>
                    <motion.div key={'server-select'} initial={{translateX: '-100%'}} animate={{translateX: '0%'}} exit={{translateX: "-100%"}} className='server-list-wrapper'>
                        <ServerList selectServer={selectServer} serverList={serverList} loading={loadingUserServerListState} />
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    )
}

