import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ToggleSwitch.module.css";

/**
 * Props:
 * - checked            (bool, optional) controlled state
 * - initialState       (bool, default false) uncontrolled initial
 * - onChange(next)     (fn) called with boolean next state
 * - disabled           (bool) disable interactions
 * - size               ('sm'|'md'|'lg', default 'md')
 * - className, style   (optional)
 * - id                 (optional) associates label with input
 */
const ToggleSwitch = ({
  checked,
  initialState = false,
  onChange,
  disabled = false,
  size = "md",
  className = "",
  style,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}) => {
  const isControlled = typeof checked === "boolean";
  const [internal, setInternal] = useState(initialState);
  const isOn = isControlled ? checked : internal;

  // Sync uncontrolled when initialState changes
  useEffect(() => {
    if (!isControlled) setInternal(initialState);
  }, [initialState, isControlled]);

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowLeft") {
      if (isOn) onChange?.(false);
      if (!isControlled) setInternal(false);
    } else if (e.key === "ArrowRight") {
      if (!isOn) onChange?.(true);
      if (!isControlled) setInternal(true);
    }
  };

  // Size vars for Framer offsets (matches CSS variables)
  const metrics = useMemo(() => {
    const map = {
      sm: { w: 36, h: 22, thumb: 16, pad: 3 },
      md: { w: 48, h: 28, thumb: 20, pad: 4 },
      lg: { w: 60, h: 34, thumb: 24, pad: 5 },
    };
    return map[size] || map.md;
  }, [size]);

  const xOn = metrics.w - metrics.thumb - metrics.pad * 2;
  const xOff = 0;

  // Keep a hidden native checkbox for better a11y/forms
  const inputRef = useRef(null);

  return (
    <div
      className={[
        styles.toggle,
        styles[size],
        isOn ? styles.on : styles.off,
        disabled ? styles.disabled : "",
        className,
      ].join(" ")}
      style={style}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={onKeyDown}
      data-state={isOn ? "on" : "off"}
      data-disabled={disabled ? "true" : "false"}
    >
      {/* Hidden checkbox for form semantics; sync value */}
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className={styles.visuallyHidden}
        checked={!!isOn}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
      />

      <span className={styles.track} />

      <motion.span
        className={styles.thumb}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        animate={{ x: isOn ? xOn : xOff }}
      />
    </div>
  );
};

export default ToggleSwitch;
