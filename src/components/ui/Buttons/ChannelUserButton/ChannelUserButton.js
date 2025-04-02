import React from 'react'
import { useSelector } from 'react-redux'

import styles from './ChannelUserButton.module.css';
import { ImageComponent } from '../../../ui/Image/Image';
import { MicOff, ScreenShare, Video, VolumeOff } from 'lucide-react';

export const ChannelUserButton = ({user_id, active}) => {
    
    try {
        
        const user = useSelector(state => state.serverUsersSlice.users[user_id]);

        return (
            <div className={styles.container}>
                <span 
                style={{
                    border: `solid 2px ${user.voiceActive && active ? 'var(--success-color)' : 'transparent'}`
                }}
                className={styles.userImage}>
                    <ImageComponent src={user.user_image} />
                </span>
                <h3>{user.display_name}</h3>
                {user.channel_status ?
                <div className={styles.statusContainer}>
                    {user?.channel_status?.isMicrophoneMuted ? <MicOff width={15} height={15} color='var(--text-color)' /> : null}
                    {user?.channel_status?.isAudioMuted ? <VolumeOff width={15} height={15} color='var(--text-color)' /> : null}
                    {user?.channel_status?.isWebcamOn ? <Video width={15} height={15} color='var(--text-color)' />  : null}
                    {user?.channel_status?.isScreenSharing ? <ScreenShare width={15} height={15} color='var(--text-color)' /> : null}
                </div>
                : null}
            </div>
        )

    } catch (error) {
        return <></>
    }
}
