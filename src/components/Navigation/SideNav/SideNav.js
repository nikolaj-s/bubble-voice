import React from 'react';

import styles from "./SideNav.module.css"
import { Logo } from '../../Icons/Bubble/Logo';
import {ServerButton} from '../../Buttons/ServerButton/ServerButton';
import { useSelector } from 'react-redux';
import { selectServers } from '../../../features/Servers/serversSlice';

export const SideNav = () => {

    const servers = useSelector(selectServers);

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo />
            </div>
            {servers.map(s => {
                return <ServerButton key={s.server_id} {...s} />
            })}
        </div>
    )
}
