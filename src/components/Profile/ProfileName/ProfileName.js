import React from "react";
import styles from "./ProfileName.module.css";

const ProfileName = ({ display_name, username }) => {
  return (
    <div className={styles.profileNameContainer}>
      <span className={styles.displayName}>{display_name}</span>
      <span className={styles.username}>@{username}</span>
    </div>
  );
};

export default ProfileName;
