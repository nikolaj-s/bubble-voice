import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ label, onClick, icon, top, bottom, zIndex }) => {
    return (
        <button
        style={{
            style: zIndex
        }}
        className={styles.contextButton} onClick={onClick}>
            <p>
            {label}
            </p>
            {icon}
        </button>
    );
};

export default ContextMenuButton;
