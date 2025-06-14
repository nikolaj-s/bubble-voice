import React from 'react';

import styles from './Profile.module.css'
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ProfileName from './ProfileName/ProfileName';
import ProfileBio from './ProfileBio/ProfileBio';
import MiniStreamIndicator from '../ui/MiniStreamIndicator/MiniStreamIndicator';

export const Profile = ({account = {}, options = false}) => {
    
    const channelStatus = account?.channel_status || {};

    return (
        <div 
        style={{
            backgroundColor: account.color
        }}
        className={styles.container}>
            <ProfileBanner {...account} />
            <ProfileName {...account} />
            {!options && (
                <>
                {channelStatus?.streamDetails && (<MiniStreamIndicator streamColor={channelStatus?.streamColor} thumbnail={channelStatus?.streamPreview} name={channelStatus?.streamDetails?.name} />)}
                <ProfileBio {...account} />
                </>
            )}
            
        </div>
    )
}
