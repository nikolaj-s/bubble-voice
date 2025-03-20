import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ label, onClick }) => {
    return (
        <button className={styles.contextButton} onClick={onClick}>
            {label}
        </button>
    );
};

export default ContextMenuButton;
