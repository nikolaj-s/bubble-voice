import React from 'react';

import styles from './Channels.module.css';
import { useSocket } from '../../../context/SocketContext';
import { useDispatch } from 'react-redux';

export const Channels = () => {

    const socket = useSocket();

    const dispatch = useDispatch();

    React.useEffect(() => {

        if (!socket) return;

        

    }, [socket])

    return (
        <div className={styles.container}>

        </div>
    )
}
