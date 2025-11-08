import React, { useEffect, useRef } from "react";

import styles from "./ContextMenuButton.module.css";

import VolumeSlider from "../../Inputs/VolumeSlider/VolumeSlider";

const ContextRangeInput = ({ label, value = 0, onChange, min = 0, max = 100 }) => {

    const [localValue, setLocalValue] = React.useState(value);

       // Always keep the latest localValue in the ref
    const localValueRef = useRef(localValue);
    
    useEffect(() => {

        localValueRef.current = localValue;

        onChange(localValue);

    }, [localValue, onChange]);

    useEffect(() => {

        return () => {
          //  onChange?.(localValueRef.current);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div onClick={(e) => {e.stopPropagation()}} onMouseUp={(e) => {e.stopPropagation()}} className={styles.rangeContainer}>
            <p>{label}</p>
            <VolumeSlider width={'100%'} value={localValue} onChange={(value) => {setLocalValue(value)}} label={localValue * 100} min={min} max={max} />
        </div>
    );
};

export default ContextRangeInput;
