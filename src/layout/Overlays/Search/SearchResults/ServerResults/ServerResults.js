import React from 'react';

import styles from './ServerResults.module.css';
import ServerCard from '../../../../../components/ServerCard/ServerCard';
import { NoBubbleResults } from '../../../../../components/Misc/NoBubbleResults/NoBubbleResults';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../../../../features/Overlay/overlaySlice';

export const ServerResults = ({servers}) => {

    const dispatch = useDispatch();

    const handleCreateBubble = () => {
        dispatch(setOverlay("createServer"));
    }

    return (
        <div className={styles.container}>
            {servers.length === 0 ?
            <NoBubbleResults 
            onCreateBubble={handleCreateBubble}
            />
            :
            servers.map(server => {
                return <ServerCard server={server} key={server.server_id} />
            })}
        </div>
    )
}
