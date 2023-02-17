
// library's
import React from 'react'
import { useDispatch } from 'react-redux';

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


export const Dashboard = () => {

    const dispatch = useDispatch();

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
