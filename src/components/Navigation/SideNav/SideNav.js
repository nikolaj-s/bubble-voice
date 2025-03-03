import React from 'react';

import styles from "./SideNav.module.css"
import { Logo } from '../../../Icons/Bubble/Logo';
import {ServerButton} from '../../Buttons/ServerButton/ServerButton';

export const SideNav = () => {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <ServerButton image='' server_name='The Igloo' />
        </div>
    )
}
