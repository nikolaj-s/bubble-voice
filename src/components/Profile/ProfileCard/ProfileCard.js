import React from 'react';
import styles from './ProfileCard.module.css';
import { ImageComponent } from '../../ui/Image/Image';

const ProfileCard = ({ user_image, user_banner, display_name, username, color }) => {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <ImageComponent objectFit='cover' src={user_banner} alt="Banner" className={styles.bannerImage} />
      </div>
      <div style={{borderColor: color}} className={styles.avatarWrapper}>
        <ImageComponent src={user_image} alt="Avatar" className={styles.avatar} />
      </div>
      <div className={styles.info}>
        <h2 className={styles.displayName}>{display_name}</h2>
        <p className={styles.username}>@{username}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
