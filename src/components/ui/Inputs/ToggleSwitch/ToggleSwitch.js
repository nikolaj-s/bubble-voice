import React, { useEffect, useMemo, useState } from "react";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch({
  initialState = false,
  onToggle = () => {},
  disabled = false,
  id,
  label,
  className = "",
}) {
  const start = useMemo(() => Boolean(initialState), [initialState]);
  const [checked, setChecked] = useState(start);

  // Keep in sync if initialState changes
  useEffect(() => setChecked(start), [start]);

  const toggle = () => {
    if (disabled) return;
    setChecked(prev => {
      const next = !prev;
      onToggle(next);
      return next;
    });
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        className={`${styles.switch} ${checked ? styles.on : styles.off} ${disabled ? styles.disabled : ""}`}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
