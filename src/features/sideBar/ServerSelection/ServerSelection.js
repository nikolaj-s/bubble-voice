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
import { setServerId, setServerName, setTopPos } from '../../server/ServerSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { selectLoadingUsersServersState, selectServerList, selectServerQuery, selectServerSearchResults, setServerQuery, setSideBarHeader } from '../sideBarSlice';

const Selection = () => {
  
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handle users server list
    const serverList = useSelector(selectServerList);

    const loadingUserServerListState= useSelector(selectLoadingUsersServersState);

    const selectServer = (_id, name, top_pos) => {
        
        dispatch(setServerId(_id))
        dispatch(setTopPos(top_pos))
        dispatch(setServerName(name))

        setTimeout(() => {

            navigate(`/dashboard/server/${name}`)
        
        }, 5)
            
    }
   
    const serverSearchQuery = useSelector(selectServerQuery);

    React.useEffect(() => {
        dispatch(setHeaderTitle("Select Server"))
        dispatch(setSideBarHeader("Servers"))
    // eslint-disable-next-line   
    }, [])

    return (
        <div className='side-bar-inner-container'>
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


export const ServerSelection = () => useRoutes([
    {path: "/", element: <Selection /> },
    {path: "/join-server/:id", element: <Selection /> },
    {path: "/createserver", element: <Selection /> }
])