// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router'
import { motion } from 'framer-motion'

// components
import { SettingsCategoryButton } from '../../../components/buttons/SettingsCategoryButton/SettingsCategoryButton';

// state
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setSideBarHeader } from '../../sideBar/sideBarSlice';

// style
import "./ServerSettings.css";
import { selectUsersPermissions, toggleServerSettingsOpenState } from '../ServerSlice';

const Menu = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [settings] = React.useState([{name: "Overview", link: "overview"}, {name: "Members", link: "members"}, {name: "Channels", link: "channels"}, {name: "Permission Groups", link: "permission-groups"}, {name: "Ban List", link: "ban-list"}])

    const permissions = useSelector(selectUsersPermissions);

    const secondaryColor = useSelector(selectSecondaryColor);

    React.useEffect(() => {

        dispatch(toggleServerSettingsOpenState(true))
        
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
        
        if (nav) nav.style.zIndex = 0;

        if (userStreams) userStreams.style.display = 'none';

        if (serverSelect) serverSelect.style.zIndex = 0;
        
        return () => {
            dispatch(toggleServerSettingsOpenState(false))

            if (serverNav) serverNav.style.display = null;

            if (rmAmbiance) rmAmbiance.style.display = null;

            if (ambiance) ambiance.style.display = null;

            if (nav) nav.style.zIndex = null;

            if (ct) ct.style.zIndex = null;

            if (userStreams) userStreams.style.display = null;

            if (serverSelect) serverSelect.style.zIndex = null;
        
        }
    // eslint-disable-next-line
    }, [])

    const navigateServerSettings = (link) => {
        const currentUrl = window.location.hash.split('#')[1].split('/server-settings')[0]

        navigate(currentUrl + `/server-settings/${link}`)
    }

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className='server-settings-menu'>
            <div 
            style={{backgroundColor: secondaryColor}}
            className='inner-server-settings-container'>
                <div className='server-settings-buttons-wrapper'>
                    {settings.map((setting) => {
                        return <SettingsCategoryButton
                        action={navigateServerSettings}
                        key={setting.name}
                        name={setting.name}
                        link={setting.link}
                        active={window.location.hash.search(setting.link) !== -1}
                        />
                    })}
                </div>
                {permissions?.server_group_name === 'Owner' ? 
                <SettingsCategoryButton margin={'0 0 10px 0'} action={navigateServerSettings} link={'delete-server'} active={window.location.hash.search('delete-server') !== -1} name={'Delete Server'} /> 
                :
                <SettingsCategoryButton margin={'0 0 10px 0'} name="Dispand Server" />
                }
            </div>
        </motion.div>
    )
}

export const ServerSettingsMenu = () => useRoutes([
    { path: "/server-settings/*", element: <Menu /> },
    { path: "/create-channel-menu/server-settings/*", element: <Menu /> },
    { path: "/channel/:id/server-settings/*", element: <Menu />},
    { path: "/channel/:id/create-channel-menu/server-settings/*", element: <Menu />},
])
