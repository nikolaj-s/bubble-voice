import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ label, onClick, icon, top, bottom, zIndex, color }) => {
    return (
        <button
        style={{
            style: zIndex,
            color
        }}
        onKeyUp={(e) => {
            if (e.key === 'Enter') {
                onClick()
            }
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
