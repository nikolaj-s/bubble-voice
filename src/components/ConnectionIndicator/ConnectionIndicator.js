import React from 'react';

import styles from './ConnectionIndicator.module.css';

import IconButton from '../ui/Buttons/IconButton/IconButton';

import { useSocketPing } from '../../hooks/useSocketPing';
import { useSelector } from 'react-redux';
import ConnectionDetails from '../ConnectionDetails/ConnectionDetails';

export const ConnectionIndicator = () => {

    const {status, connectionInfo} = useSelector(state => state.connectionSlice);


    const ping = useSocketPing();

    return (
        <IconButton 
        width={50}
        padding={10}
        height={35}
        backgroundColor='var(--primary-color)'
        title={
            <>
            <ConnectionDetails ping={ping} {...connectionInfo} />
            </>
        }
        Icon={
        <div className={styles.connection}>
            <div
            className={styles.barOne}
            style={{
                backgroundColor:
                ping != null && ping < 300
                    ? ping < 150
                    ? 'var(--success-color)'
                    : 'var(--error-color)'
                    : null
            }}
            />
            <div
            className={styles.barTwo}
            style={{
                backgroundColor: ping != null && ping < 150 ? 'var(--success-color)' : null
            }}
            />
            <div
            className={styles.barThree}
            style={{
                backgroundColor: ping != null && ping < 80 ? 'var(--success-color)' : null
            }}
            />
        </div>
        }
        onClick={() => {}}
        />
    )
}
