import React from 'react';

import styles from './Channels.module.css';
import { ChannelsProvider } from '../../../providers/ChannelsProvider/ChannelsProvider';
import { ReOrderChannels } from './ReOrderChannels/ReOrderChannels';

export const Channels = () => {

    return (
        <div className={styles.container}>
            <ChannelsProvider>
                <ReOrderChannels />
            </ChannelsProvider>
        </div>
    )
}
