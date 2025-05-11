import React from "react";
import styles from "./ContextMenuButton.module.css";
import VolumeSlider from "../../Inputs/VolumeSlider/VolumeSlider";
import Label from "../../Titles/Label/Label";

const ContextRangeInput = ({ label, value = 0, onChange, min = 0, max = 100 }) => {

    const [localValue, setLocalValue] = React.useState(value);

    return (
        <div className={styles.rangeContainer}>
            <Label fontSize={12} label={label} />
            <VolumeSlider width={'100%'} value={localValue} onChange={(value) => {setLocalValue(value); onChange(value)}} label={localValue * 100} min={min} max={max} />
        </div>
    );
};

export default ContextRangeInput;
