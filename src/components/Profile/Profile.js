import React from 'react';

import styles from './Profile.module.css'
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ProfileName from './ProfileName/ProfileName';
import ProfileBio from './ProfileBio/ProfileBio';

export const Profile = ({account = {}}) => {
    return (
        <div 
        style={{
            backgroundColor: account.color
        }}
        className={styles.container}>
            <ProfileBanner {...account} />
            <ProfileName {...account} />
            <ProfileBio {...account} />
        </div>
    )
}
