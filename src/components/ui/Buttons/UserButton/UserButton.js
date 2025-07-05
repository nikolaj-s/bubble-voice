import React from "react";
import { motion } from "framer-motion";
import styles from "./UserButton.module.css";
import { ImageComponent } from "../../Image/Image";
import IconButton from "../IconButton/IconButton";
import { triggerContext } from "../../../../lib/services/helperFunctions";
import { Ellipsis } from "lucide-react";

const UserButton = ({ _id: user_id, user_image, display_name, username, status, onClick = () => {}, maxWidth, user, controlBar,  showContextButton, showUsername, id = 'user' }) => {
    
    return (
        <motion.button
        id={`${user_id}-${id}`}
        data-context={controlBar ? null : JSON.stringify({...user, type: 'user'})}
        className={styles.userButton}
        onClick={(e) => onClick(user_id, e)}
       style={{maxWidth: maxWidth, opacity: status === 'offline' ? 0.6 : 1}}
        >
        <div className={styles.avatar}>
            <ImageComponent src={user_image} />
        </div>
        <div className={styles.userInfo}>
            <span className={styles.displayName}>{display_name}{showUsername && (<span className={styles.username}>@{username}</span>)}</span>
            <span className={styles.statusText}>{status}</span>
        </div>
        {showContextButton && (<IconButton title={'Show Options'} Icon={Ellipsis} onClick={(e) => {triggerContext(e, `${user_id}-${id}`)}} />)}
        </motion.button>
    );
};

export default UserButton;
