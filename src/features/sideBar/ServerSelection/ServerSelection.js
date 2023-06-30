 // library's
import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// components
import { ServerList } from './serverList/ServerList'

// style's
import "./ServerSelection.css";
import { handleLeavingServer, navigateToServer, selectCurrentChannelId, selectServerId, setServerId, setServerName, setTopPos } from '../../server/ServerSlice';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { selectLoadingUsersServersState, selectServerList, setSideBarHeader } from '../sideBarSlice';
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { clearWidgetOverLay } from '../../server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { ServerButtons } from './ServerButtons/ServerButtons';
import { setSelectedMember } from '../../server/ChannelRoom/MemberPanel/MemberPanelSlice';

export const ServerSelection = () => {
  
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handle users server list
    const serverList = useSelector(selectServerList);

    const currentServer = useSelector(selectServerId);

    const loadingUserServerListState= useSelector(selectLoadingUsersServersState);

    const selectServer = (_id, name, top_pos) => {
        
        if (_id === currentServer) return;

        dispatch(setSelectedMember(""));

        if (currentServer) {

            dispatch(navigateToServer({server_to_join_id: _id}))

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
        <div id="side-server-list-wrapper" className='side-bar-inner-container'>        
            <ServerList selectServer={selectServer} serverList={serverList} loading={loadingUserServerListState} />
            <ServerButtons />
        </div>
    )
}

