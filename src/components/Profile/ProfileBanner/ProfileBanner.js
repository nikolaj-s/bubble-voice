import React from "react";
import styles from "./ProfileBanner.module.css";
import { ImageComponent } from "../../ui/Image/Image";

const ProfileBanner = ({ user_banner, user_image, color }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}>
        <ImageComponent src={user_banner} alt="User Banner" />
      </div>
     
      <div 
      style={{
        borderColor: color || null
      }}
      className={styles.profileWrapper}>
        <ImageComponent src={user_image} alt="User Profile" className={styles.profileImage} />
      </div>
    </div>
  );
};

export default ProfileBanner;
