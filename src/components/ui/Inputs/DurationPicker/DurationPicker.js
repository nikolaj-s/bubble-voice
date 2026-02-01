// DurationPicker.js (simplified)
import React from "react";
import PropTypes from "prop-types";
import { Minus, Plus, Clock } from "lucide-react";
import styles from "./DurationPicker.module.css";

/**
 * Simplified Bubble DurationPicker
 * - Controlled via valueMinutes + onChangeMinutes
 * - Stepper + presets
 * - Optional unit toggle (min/hr/day)
 * - No border-heavy styling (Bubble-clean)
 */
export default function DurationPicker({
  label = "Duration",
  valueMinutes = 10,
  onChangeMinutes,
  minMinutes = 1,
  maxMinutes = 7 * 24 * 60,
  presets = [5, 10, 30, 60, 120, 24 * 60],
  stepMinutes = 1,
  showUnitToggle = true,
  disabled = false,
  className = "",
}) {
  const clamp = (v) => Math.max(minMinutes, Math.min(maxMinutes, v));

  const [unit, setUnit] = React.useState("min"); // "min" | "hr" | "day"
  const [raw, setRaw] = React.useState("");

  React.useEffect(() => {
    setRaw(String(toUnitValue(valueMinutes, unit)));
  }, [valueMinutes, unit]);

  const commitMinutes = (mins) => {
    onChangeMinutes?.(clamp(mins));
  };

  const step = (dir) => {
    if (disabled) return;
    commitMinutes((Number(valueMinutes) || 0) + dir * stepMinutes);
  };

  const onPreset = (mins) => {
    if (disabled) return;
    commitMinutes(mins);
  };

  const onInputChange = (e) => {
    if (disabled) return;
    const v = e.target.value;
    if (v === "") return setRaw("");
    if (!/^\d+$/.test(v)) return;
    setRaw(v);
  };

  const onInputCommit = () => {
    if (disabled) return;
    if (raw === "") {
      setRaw(String(toUnitValue(valueMinutes, unit)));
      return;
    }
    commitMinutes(fromUnitValue(Number(raw), unit));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
  };

  const safePresets = (presets || [])
    .filter((p) => Number.isFinite(p))
    .map((p) => Math.round(p))
    .filter((p) => p >= minMinutes && p <= maxMinutes);

  return (
    <div className={`${styles.wrapper} ${className}`} data-disabled={disabled ? "true" : "false"}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => step(-1)}
          disabled={disabled || valueMinutes <= minMinutes}
          aria-label="Decrease duration"
        >
          <Minus size={16} />
        </button>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            value={raw}
            onChange={onInputChange}
            onBlur={onInputCommit}
            onKeyDown={onKeyDown}
            disabled={disabled}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Duration value"
          />

          <span className={styles.unitPill} aria-hidden="true">
            {unitLabel(unit)}
          </span>
        </div>

        <button
          type="button"
          className={styles.stepButton}
          onClick={() => step(1)}
          disabled={disabled || valueMinutes >= maxMinutes}
          aria-label="Increase duration"
        >
          <Plus size={16} />
        </button>
      </div>

      {showUnitToggle && (
        <div className={styles.unitToggle} role="tablist" aria-label="Duration unit">
          <UnitTab active={unit === "min"} onClick={() => !disabled && setUnit("min")}>
            min
          </UnitTab>
          <UnitTab active={unit === "hr"} onClick={() => !disabled && setUnit("hr")}>
            hr
          </UnitTab>
          <UnitTab active={unit === "day"} onClick={() => !disabled && setUnit("day")}>
            day
          </UnitTab>
        </div>
      )}

      {!!safePresets.length && (
        <div className={styles.presets} aria-label="Quick presets">
          {safePresets.map((mins) => (
            <button
              type="button"
              key={mins}
              className={`${styles.preset} ${mins === valueMinutes ? styles.presetActive : ""}`}
              onClick={() => onPreset(mins)}
              disabled={disabled}
              title={formatDuration(mins)}
            >
              {formatPresetLabel(mins)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function UnitTab({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`${styles.unitTab} ${active ? styles.unitTabActive : ""}`}
      onClick={onClick}
      role="tab"
      aria-selected={active}
    >
      {children}
    </button>
  );
}

UnitTab.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

DurationPicker.propTypes = {
  label: PropTypes.string,
  valueMinutes: PropTypes.number,
  onChangeMinutes: PropTypes.func.isRequired,
  minMinutes: PropTypes.number,
  maxMinutes: PropTypes.number,
  presets: PropTypes.arrayOf(PropTypes.number),
  stepMinutes: PropTypes.number,
  showUnitToggle: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

function unitLabel(unit) {
  if (unit === "hr") return "hr";
  if (unit === "day") return "day";
  return "min";
}

function toUnitValue(totalMinutes, unit) {
  const mins = Math.max(0, Number(totalMinutes) || 0);
  if (unit === "day") return Math.max(0, Math.round(mins / 1440));
  if (unit === "hr") return Math.max(0, Math.round(mins / 60));
  return mins;
}

function fromUnitValue(value, unit) {
  const v = Math.max(0, Number(value) || 0);
  if (unit === "day") return v * 1440;
  if (unit === "hr") return v * 60;
  return v;
}

function formatPresetLabel(mins) {
  const m = Number(mins) || 0;
  if (m % 1440 === 0) return `${m / 1440}d`;
  if (m % 60 === 0) return `${m / 60}h`;
  return `${m}m`;
}

function formatDuration(totalMinutes) {
  const mins = Math.max(0, Number(totalMinutes) || 0);
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;

  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m || !parts.length) parts.push(`${m}m`);
  return parts.join(" ");
}
