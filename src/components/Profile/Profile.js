import React from 'react';

import styles from './Profile.module.css';
import ProfileBio from './ProfileBio/ProfileBio';
import MiniStreamIndicator from '../ui/MiniStreamIndicator/MiniStreamIndicator';
import ProfileCard from './ProfileCard/ProfileCard';
import { ProfileActionBar } from './ProfileActionBar/ProfileActionBar';

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
                {channelStatus?.streamDetails && (<MiniStreamIndicator streamColor={channelStatus?.streamColor} thumbnail={channelStatus?.streamPreview} name={channelStatus?.streamDetails?.name} />)}
                <ProfileBio {...account} />
                </>
            )}
            
        </div>
    )
}
