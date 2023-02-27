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
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor } from './appearanceSettings/appearanceSettingsSlice';
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
        dispatch(setSideBarHeader("Settings"))

        animation.start({
            left: "0",
            opacity: 1
        })

        return () => {
            dispatch(setSideBarHeader(""))
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
        <motion.div initial={{left: "-100%", opacity: 0}} animate={animation} style={{backgroundColor: secondaryColor}} className='app-settings-menu'>
            <div style={{backgroundColor: primaryColor, height: 32, width: '100%'}} ></div>
            <div className='inner-app-settings-container'>
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


