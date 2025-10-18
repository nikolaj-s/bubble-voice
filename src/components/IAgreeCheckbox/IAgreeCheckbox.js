// IAgreeCheckbox.jsx
import React from "react";
import styles from "./IAgreeCheckbox.module.css";

export default function IAgreeCheckbox({ agreed, onChange }) {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => onChange(e.target.checked)}
      />
      I agree to the{" "}
      <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
        Terms & Conditions
      </a>{" "}
      and{" "}
      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </a>
    </label>
  );
}
