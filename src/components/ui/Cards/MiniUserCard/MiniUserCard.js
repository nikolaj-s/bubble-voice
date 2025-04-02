import React from 'react'

import styles from "./MiniUserCard.module.css";
import { ImageComponent } from '../../Image/Image';

export const MiniUserCard = ({ display_name, user_image, color, user_banner }) => {
  return (
    <div className={styles.card} style={{ borderColor: color }}>
     
      {/* User Avatar & Name */}
      <div className={styles.content}>
        <div className={styles.avatar}>
            <ImageComponent src={user_image} />
        </div>
        <p className={styles.name}>{display_name}</p>
      </div>
    </div>
  );
};

export default MiniUserCard;

