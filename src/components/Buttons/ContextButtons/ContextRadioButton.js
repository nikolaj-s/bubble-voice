import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextRadioButton = ({ label, checked, onChange }) => {
    return (
        <label className={styles.radioButton}>
            <input type="radio" checked={checked} onChange={onChange} />
            <span className={styles.radioIndicator} />
            {label}
        </label>
    );
};

export default ContextRadioButton;
