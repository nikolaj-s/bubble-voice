import React from 'react'

import { useSelector } from 'react-redux'

import styles from './ChannelUserButton.module.css';

import { ImageComponent } from '../../../ui/Image/Image';

import MediaStatusIcons from '../../../MediaStatusIcons/MediaStatusIcons';

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
                <MediaStatusIcons {...user?.channel_status} />
            </div>
        )

    } catch (error) {
        return <></>
    }
}
