import React from 'react';

import styles from './DeletedFeedItem.module.css'
import Label from '../../../ui/Titles/Label/Label';

export const DeletedFeedItem = ({data}) => {
    const { channel_name, category_name } = data

    return (
        <div className={styles.container}>
        <div className={styles.content}>
            <Label label='Deleted:' />
            <span className={styles.text}>deleted {channel_name ? 'channel' : 'category'} <span className={styles.channelName}>{channel_name || category_name}</span></span>
        </div>
        </div>
    )
}
