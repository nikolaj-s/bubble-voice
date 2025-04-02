import React from 'react';

import styles from './ChannelBackground.module.css';

export const ChannelBackground = ({channel_background}) => {

    if (!channel_background) return null;

    return (
        <div className={styles.background}>
            <img src={channel_background} alt='channel-background' />
        </div>
    )
}
