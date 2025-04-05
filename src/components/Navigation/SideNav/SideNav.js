import React from 'react';

import styles from "./SideNav.module.css"
import { Logo } from '../../Icons/Bubble/Logo';
import {ServerButton} from '../../ui/Buttons/ServerButton/ServerButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectServers, updateServerButton } from '../../../features/Servers/serversSlice';
import { useNavigate } from 'react-router';
import { useSocket } from '../../../context/SocketContext';
import { CircleButton } from '../../ui/Buttons/CircleButton/CircleButton';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { Plus, Settings } from 'lucide-react';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';
import IconButton from '../../ui/Buttons/IconButton/IconButton';

export const SideNav = () => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const navigate = useNavigate();

    const servers = useSelector(selectServers);

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
        <div className={`${styles.container} side-navigation-global`}>
            <div className={styles.logo}>
                <IconButton 
                onClick={handleReturnToDashBoard}
                Icon={<Logo />}
                padding={0}
                width={60}
                height={60}
                title={
                <p style={{
                    padding: 5,
                    margin: 0,
                    fontSize: '14px'
                }}>
                    Dashboard
                </p>}
                position='right'
                />
                <PillSpacer />
            </div>
           
            <div className={styles.serverButtons}>
                {servers.map(s => {
                    return <ServerButton action={handleSwitchServer} key={s.server_id} {...s} />
                })}
            </div>
            <div className={styles.navButtons}>
                <PillSpacer />
                <CircleButton action={() => {dispatch(setOverlay('createServer'))}} name="Create" >
                    <Plus color='var(--text-color)' />
                </CircleButton>
                <CircleButton action={() => {dispatch(setOverlay('settings'))}} name={"Settings"} >
                    <Settings color='var(--text-color)' />
                </CircleButton>
            </div>
        </div>
    )
}
