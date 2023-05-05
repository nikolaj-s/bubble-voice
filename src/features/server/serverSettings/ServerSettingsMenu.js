// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router'
import { motion } from 'framer-motion'

// components
import { SettingsCategoryButton } from '../../../components/buttons/SettingsCategoryButton/SettingsCategoryButton';

// state
import { selectPrimaryColor, selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
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

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {
        dispatch(setSideBarHeader("Server Settings"))
        dispatch(toggleServerSettingsOpenState(true))
        return () => {
            dispatch(toggleServerSettingsOpenState(false))
            dispatch(setSideBarHeader(""))
        }
    // eslint-disable-next-line
    }, [])

    const navigateServerSettings = (link) => {
        const currentUrl = window.location.hash.split('#')[1].split('/server-settings')[0]

        navigate(currentUrl + `/server-settings/${link}`)
    }

    return (
        <motion.div 
        initial={{left: "-100%", opacity: 0}}
        animate={{left: "0%", opacity: 1}}
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
                <SettingsCategoryButton action={navigateServerSettings} link={'delete-server'} active={window.location.hash.search('delete-server') !== -1} name={'Delete Server'} /> 
                :
                <SettingsCategoryButton name="Dispand Server" />
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
