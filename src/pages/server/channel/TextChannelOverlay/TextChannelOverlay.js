import React from 'react'
import { useSelector } from 'react-redux'
import { TextChannel } from '../TextChannel/TextChannel';
import { ChannelProvider } from '../../../../providers/ChannelProvider/ChannelProvider';

import styles from './TextChannelOverlay.module.css'

export const TextChannelOverlay = () => {

    const channel = useSelector(state => state.textChannelSlice.currentTextChannel);

    return (
        <div className={styles.container}>
            <ChannelProvider overlay={true} channel_id_prop={channel}>
                <TextChannel channel={channel} />
            </ChannelProvider>
        </div>
    )
}
