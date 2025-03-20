import React from 'react';

import styles from "./SideNav.module.css"
import { Logo } from '../../Icons/Bubble/Logo';
import {ServerButton} from '../../Buttons/ServerButton/ServerButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectServers, updateServerButton } from '../../../features/Servers/serversSlice';
import { useNavigate } from 'react-router';
import { useSocket } from '../../../context/SocketContext';
import { CircleButton } from '../../Buttons/CircleButton/CircleButton';
import {SettingsIcon} from '../../Icons/Settings/SettingsIcon';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { Settings } from 'lucide-react';

export const SideNav = () => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const navigate = useNavigate();

    const servers = useSelector(selectServers);

    const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-color')
    .trim();

    const handleSwitchServer = (server_id) => {
        navigate(`/dashboard/server/${server_id}`)
    }

    const handleReturnToDashBoard = () => {
        navigate('/dashboard')
    }

    React.useEffect(() => {

        if (socket) {

            const handleJoinServer = async () => {
                try {

                    await socket.request('join servers').then(res => res).catch(error => {
                        console.log(error);
                    })

                } catch (error) {
                    console.log(error);
                }
            }

            const handleUpdateServerButton = (data) => {
                dispatch(updateServerButton(data));
            }

            handleJoinServer();

            socket.on('connect', handleJoinServer);

            socket.on('update server button', handleUpdateServerButton);

            return () => {
                socket.off('connect', handleJoinServer);

                socket.off('update server button', handleUpdateServerButton);
            }

        }

    }, [socket, servers])

    return (
        <div className={styles.container}>
            <div onClick={handleReturnToDashBoard} className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.serverButtons}>
                {servers.map(s => {
                    return <ServerButton action={handleSwitchServer} key={s.server_id} {...s} />
                })}
            </div>
            <div className={styles.navButtons}>
                <CircleButton action={() => {dispatch(setOverlay('settings'))}} name={"Settings"} >
                    <Settings color={textColor} />
                </CircleButton>
            </div>
        </div>
    )
}
