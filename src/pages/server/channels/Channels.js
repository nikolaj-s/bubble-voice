import React from 'react';

import styles from './Channels.module.css';
import { ChannelsProvider } from '../../../providers/ChannelsProvider/ChannelsProvider';
import { ReOrderChannels } from './ReOrderChannels/ReOrderChannels';
import { ServerNav } from '../../../components/Navigation/ServerNav/ServerNav';

export const Channels = ({currentChannel}) => {

    return (
        <div 
        data-context={JSON.stringify({createChannel: true, createCategory: true, type: "channelList"})} 
        className={styles.container}
        style={{
            maxHeight: currentChannel?.channel_type === 'voice' ? "calc(100vh - 242px)" : null
        }}
        >
             <div className={styles.wrapper}>
                <ServerNav />
                <ChannelsProvider>
                    <ReOrderChannels />
                </ChannelsProvider>
            </div>
        </div>
    )
}
