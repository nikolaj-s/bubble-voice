import React from 'react'

import { useSelector } from 'react-redux'

import styles from './ChannelUserButton.module.css';

import { ImageComponent } from '../../../ui/Image/Image';

import MediaStatusIcons from '../../../MediaStatusIcons/MediaStatusIcons';
import MiniStreamIndicator from '../../MiniStreamIndicator/MiniStreamIndicator';

export const ChannelUserButton = ({user_id, active, action = () => {}}) => {

    const onDragStart = (e) => {
        
    }

    try {
        
        const user = useSelector(state => state.serverUsersSlice.users[user_id]);
        
        return (
            <div 
            onDragStart={onDragStart}
            draggable={true} 
            data-context={JSON.stringify({...user, type: 'user'})} 
            onClick={() => {action(user_id)}} className={styles.container}>
                <div className={styles.wrapper}>
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
                {user?.channel_status?.streamDetails && (
                <div className={styles.streamStatus}>
                    <div className={styles.arrowIndicator} />
                    <MiniStreamIndicator channel_bar={true} {...user?.channel_status?.streamDetails}/>
                </div>
                )}
            </div>
        )

    } catch (error) {
        return <></>
    }
}
