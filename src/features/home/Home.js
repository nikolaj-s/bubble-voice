
// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ContentScreen } from '../contentScreen/ContentScreen';
import { setHeaderTitle } from '../contentScreen/contentScreenSlice';
import { selectPrimaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SideBar } from '../sideBar/SideBar';

// style
import "./Home.css";


export const Home = () => {

    const dispatch = useDispatch();

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {
        // disable app title on dashboard mount
        document.getElementById('application-title').style.opacity = 0;
        
        dispatch(setHeaderTitle('Select Server'))
    
    }, [])

    return (
        <div style={{backgroundColor: primaryColor}} className='home-container'>
            <SideBar />
            <ContentScreen />
        </div>
    )
}
