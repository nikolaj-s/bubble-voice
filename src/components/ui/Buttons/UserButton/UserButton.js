import React from "react";
import { motion } from "framer-motion";
import styles from "./UserButton.module.css";
import { ImageComponent } from "../../Image/Image";

const UserButton = ({ user_id, user_image, display_name, status, onClick = () => {}, maxWidth, user, controlBar }) => {
    
    return (
        <motion.button
        data-context={controlBar ? null : JSON.stringify({...user, type: 'user'})}
        className={styles.userButton}
        onClick={() => onClick(user_id)}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.98, filter: 'brightness(0.95)', translateY: 2, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}
        style={{maxWidth: maxWidth, opacity: status === 'offline' ? 0.6 : 1}}
        >
        <div className={styles.avatar}>
            <ImageComponent src={user_image} />
        </div>
        <div className={styles.userInfo}>
            <span className={styles.displayName}>{display_name}</span>
            <span className={styles.statusText}>{status}</span>
        </div>
        </motion.button>
    );
};

export default UserButton;
