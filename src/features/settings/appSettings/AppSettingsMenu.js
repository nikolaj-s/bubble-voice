// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router';
import { motion, useAnimation } from 'framer-motion';

// components
import { setSideBarHeader } from '../../sideBar/sideBarSlice';
import { selectAppSettings } from './appSettingsMenuSlice';
import { SettingsCategoryButton } from '../../../components/buttons/SettingsCategoryButton/SettingsCategoryButton';

// state
import { selectPrimaryColor, selectSecondaryColor } from './appearanceSettings/appearanceSettingsSlice';
import { handleSignOut } from '../appSettings/accountSettings/accountSettingsSlice';
import { signInHandleLogOutState } from '../../LoggingIn/signIn/signInSlice';

// style's
import "./AppSettingsMenu.css";
import { clearToken } from '../../../util/Validation';
import { AppVersion } from '../../../components/AppVersion/AppVersion';

const SettingsMenu = () => {

    const navigate = useNavigate();

    const animation = useAnimation();

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const settings = useSelector(selectAppSettings);

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {

        animation.start({
            opacity: 1
        })
        const userStreams =  document.getElementById('user-streams-wrapper');

        const serverSelect = document.getElementById('side-server-list-wrapper');

        const nav = document.getElementsByClassName('server-page-wrapper')[0];

        const ct = document.getElementsByClassName('content-screen-container')[0];
        
        const ambiance = document.getElementsByClassName('server-banner-ambiance')[0];

        const rmAmbiance = document.getElementsByClassName('room-ambiance-background')[0];

        const serverNav = document.getElementsByClassName('server-navigation-container')[0];

        if (serverNav) serverNav.style.display = 'none';

        if (rmAmbiance) rmAmbiance.style.display = 'none';

        if (ambiance) ambiance.style.display = 'none';
        
        if (ct) ct.style.zIndex = 0;

        if (nav) nav.style.zIndex = -1;

        if (userStreams) userStreams.style.display = 'none';

        if (serverSelect) serverSelect.style.zIndex =  0;
        
        return () => {
            if (serverNav) serverNav.style.display = null;

            if (rmAmbiance) rmAmbiance.style.display = null;

            if (ambiance) ambiance.style.display = null;

            if (ct) ct.style.zIndex = null;

            if (nav) nav.style.zIndex = null;

            if (userStreams) userStreams.style.display = null;

            if (serverSelect) serverSelect.style.zIndex = null;
        

        }
    // eslint-disable-next-line
    }, [])


    const handleLogOut = () => {
        clearToken();
        dispatch(handleSignOut())
        dispatch(signInHandleLogOutState())
        navigate("/signin")
    }

    const navigateSettings = (link) => {
        const currentUrl = window.location.hash.split('appsettings/')[0].split('#')[1];
        
        navigate(currentUrl + `appsettings/${link}`);

        const el = document.getElementsByClassName('settings-routes-wrapper')[0];

        if (el) el.style.display = 'flex'
    }

    return (
        <motion.div initial={{opacity: 0}} style={{backgroundColor: secondaryColor}}  animate={{opacity: 1}} className='app-settings-menu'>

            <div style={{backgroundColor: secondaryColor}} className='inner-app-settings-container'>
                <div className='setting-buttons-wrapper'>
                    {settings.map((setting, i) => {
                        return (<SettingsCategoryButton 
                                key={setting.name}
                                action={navigateSettings} 
                                name={setting.name} 
                                link={setting.link}
                                active={window.location.hash.search(setting.link) !== -1}
                                />)
                    })}
                </div>
                <SettingsCategoryButton action={handleLogOut} name={"Log Out"} link={"log-out"} />   
                
            </div>
            <AppVersion />
        </motion.div>
    )
}

export const AppSettingsMenu = () => useRoutes([
    { path: "createserver/appsettings/*", element: <SettingsMenu /> },
    { path: "server/:id/appsettings/*", element: <SettingsMenu />},
    { path: "join-server/:id/appsettings/*", element: <SettingsMenu /> },
    { path: "server/:id/create-channel-menu/appsettings/*", element: <SettingsMenu />},
    { path: "server/:id/channel/:id/create-channel-menu/appsettings/*", element: <SettingsMenu />},
    { path: "server/:id/channel/:id/appsettings/*", element: <SettingsMenu />},
    { path: "server/:id/channel/:id/server-settings/:id/appsettings/*", element: <SettingsMenu />},
    { path: "server/:id/server-settings/:id/appsettings/*", element: <SettingsMenu />},
    { path: "appsettings/*", element: <SettingsMenu />}
])


