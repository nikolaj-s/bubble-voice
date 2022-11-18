
// library's
import React from 'react'
import { useDispatch, useSelector} from 'react-redux';

// state
import { setHeaderTitle } from '../contentScreen/contentScreenSlice';

// components
import { SoundEffects } from '../settings/soundEffects/SoundEffects';
import { SideBar } from '../sideBar/SideBar';
import { ContentScreen } from '../contentScreen/ContentScreen';
import { ContextMenu } from "../contextMenu/ContextMenu"

// style
import "./DashBoard.css";
import { UpdateAvailable } from '../../components/UpdateAvailable/UpdateAvailable';
import { selectDefaultServer } from '../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectServerList } from '../sideBar/sideBarSlice';
import { setServerId, setServerName } from '../server/ServerSlice';
import { useNavigate } from 'react-router';


export const Dashboard = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const defaultServer = useSelector(selectDefaultServer);

    const serverList = useSelector(selectServerList);

    React.useEffect(() => {

        if (defaultServer.id) {
            const index = serverList.findIndex(s => s.server_id === defaultServer.id);

            if (index !== -1) {

                dispatch(setServerId(serverList[index].server_id));

                dispatch(setServerName(serverList[index].server_name));

                setTimeout(() => {

                    navigate(`/dashboard/server/${serverList[index].server_name}`)

                }, 5)

            }
        }

    }, [defaultServer])

    React.useEffect(() => {
        // disable app title on dashboard mount
        document.getElementById('application-title').style.opacity = 0;
        
        dispatch(setHeaderTitle('Select Server'))
        
        return () => {
            document.getElementById('application-title').style.opacity = 1;
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div className='home-container'>
            <SideBar />
            <ContentScreen />
            <SoundEffects />
            <ContextMenu />
            <UpdateAvailable />
        </div>
    )
}
