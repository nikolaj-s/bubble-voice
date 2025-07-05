import React from 'react';
import PropTypes from 'prop-types';
import styles from './SectionDivider.module.css';

const SectionDivider = ({ label }) => (
  <div className={styles.divider}>
    {label && <span className={styles.label}>{label}</span>}
  </div>
);

SectionDivider.propTypes = {
  label: PropTypes.string,
};
SectionDivider.defaultProps = {
  label: '',
};

export default SectionDivider

