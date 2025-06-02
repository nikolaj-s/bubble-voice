import React from 'react';
import styles from './SectionDivider.module.css';
import { Subtitle } from '../Titles/Subtitle/Subtitle';

/**
 * SectionDivider component
 * @param {Object} props
 * @param {string} props.label - The text to display before the line
 */
const SectionDivider = ({ label, margin }) => {
  return (
    <div className={styles.wrapper} style={{margin}}>
      <Subtitle>{label}</Subtitle>
      <div className={styles.line} />
    </div>
  );
};

export default SectionDivider;
