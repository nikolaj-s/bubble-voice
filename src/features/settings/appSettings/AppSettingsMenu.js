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
import { selectSecondaryColor } from './appearanceSettings/appearanceSettingsSlice';

// style's
import "./AppSettingsMenu.css";

const SettingsMenu = () => {

    const navigate = useNavigate();

    const animation = useAnimation();

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const settings = useSelector(selectAppSettings);

    React.useEffect(() => {
        dispatch(setSideBarHeader("Settings"))

        animation.start({
            left: "0",
            opacity: 1
        })

        return () => {
            dispatch(setSideBarHeader(""))
        }
    }, [])


    const handleLogOut = () => {
        // temp functionality
        console.log('function sign out')
        navigate("/signin")
    }

    const navigateSettings = (link) => {
        const currentUrl = window.location.hash.split('appsettings/')[0].split('#')[1];
        
        navigate(currentUrl + `appsettings/${link}`)
    }

    return (
        <motion.div initial={{left: "-100%", opacity: 0}} animate={animation} style={{backgroundColor: secondaryColor}} className='app-settings-menu'>
            <div className='inner-app-settings-container'>
                <div className='setting-buttons-wrapper'>
                    {settings.map((setting, i) => {
                        return (<SettingsCategoryButton 
                                action={navigateSettings} 
                                name={setting.name} 
                                link={setting.link}
                                active={window.location.hash.search(setting.link) !== -1}
                                />)
                    })}
                </div>
                <SettingsCategoryButton action={handleLogOut} name={"Log Out"} link={"log-out"} />   
            </div>
        </motion.div>
    )
}

export const AppSettingsMenu = () => useRoutes([
    { path: "createserver/appsettings/*", element: <SettingsMenu /> },
    { path: "server/:id/appsettings/*", element: <SettingsMenu />},
    { path: "appsettings/*", element: <SettingsMenu />}
])


