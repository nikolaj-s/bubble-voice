import React from 'react';
import styles from './SectionDivider.module.css';

/**
 * SectionDivider component
 * @param {Object} props
 * @param {string} props.label - The text to display before the line
 */
const SectionDivider = ({ label, margin }) => {
  return (
    <div className={styles.wrapper} style={{margin}}>
      <span className={styles.label}>{label}</span>
      <div className={styles.line} />
    </div>
  );
};

export default SectionDivider;
