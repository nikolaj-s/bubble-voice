import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ label, onClick, icon, top, bottom, zIndex }) => {
    return (
        <button
        style={{
            borderRadius: (top && bottom) ? 10 : top ? '10px 10px 0px 0px' : bottom ? '0px 0px 10px 10px' : '0px',
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
