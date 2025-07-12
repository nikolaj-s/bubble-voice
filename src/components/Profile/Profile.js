import React from 'react';

import styles from './Profile.module.css';
import ProfileBio from './ProfileBio/ProfileBio';
import ProfileCard from './ProfileCard/ProfileCard';
import { ProfileActionBar } from './ProfileActionBar/ProfileActionBar';
import { ProfileStreamPreview } from './ProfileStreamPreview/ProfileStreamPreview';
import { useSelector } from 'react-redux';
import { SimilarServers } from './SimilarServers/SimilarServers';

export const Profile = ({account = {}, options = false}) => {

    const {_id: user_id} = useSelector(state => state.accountSlice.account);
    
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
            {user_id !== account._id && (<SimilarServers {...account} />)}
        </div>
    )
}
