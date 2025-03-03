import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextLabelError.module.css';

const TextLabelError = ({ label, error }) => {
  return (
    <div className={styles.wrapper}>
      <label className={`${styles.label} ${error ? styles.errorLabel : ''}`}>
        {label}
      </label>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

TextLabelError.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string, // Optional error message
};

export default TextLabelError;
