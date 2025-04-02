import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextRangeInput = ({ label, value, onChange, min = 0, max = 100 }) => {
    return (
        <div className={styles.rangeContainer}>
            <span className={styles.rangeLabel}>{label}</span>
            <input
                type="range"
                className={styles.rangeInput}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default ContextRangeInput;
