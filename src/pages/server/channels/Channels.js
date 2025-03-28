import React from 'react';

import styles from './Channels.module.css';
import { ChannelsProvider } from '../../../providers/ChannelsProvider/ChannelsProvider';
import { ReOrderChannels } from './ReOrderChannels/ReOrderChannels';

export const Channels = () => {

    return (
        <div data-context={JSON.stringify({createChannel: true, createCategory: true, type: "channelList"})} className={styles.container}>
             <div className={styles.wrapper}>
                <ChannelsProvider>
                    <ReOrderChannels />
                </ChannelsProvider>
            </div>
        </div>
    )
}
