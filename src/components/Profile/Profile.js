import React from 'react';

import styles from './Profile.module.css';
import ProfileBio from './ProfileBio/ProfileBio';
import MiniStreamIndicator from '../ui/MiniStreamIndicator/MiniStreamIndicator';
import ProfileCard from './ProfileCard/ProfileCard';
import { ProfileActionBar } from './ProfileActionBar/ProfileActionBar';
import { ProfileStreamPreview } from './ProfileStreamPreview/ProfileStreamPreview';

export const Profile = ({account = {}, options = false}) => {
    
    const channelStatus = account?.channel_status || {};

    return (
        <div 
        style={{
            backgroundColor: account.color
        }}
        className={styles.container}>
            <ProfileCard {...account} />
            <ProfileActionBar profile={account} />
            {!options && (
                <>
                <ProfileStreamPreview {...account} />
                <ProfileBio {...account} />
                </>
            )}
            
        </div>
    )
}
