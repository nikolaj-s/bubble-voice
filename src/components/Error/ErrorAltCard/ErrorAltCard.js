import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle } from 'lucide-react';
import styles from './ErrorAltCard.module.css';

const ErrorAltCard = ({ title = "Something went wrong", message = "We couldn't load this content. Please try again later." }) => {
  return (
    <div className={styles.errorCard}>
      <div className={styles.iconWrapper}>
        <AlertTriangle size={28} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

ErrorAltCard.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default ErrorAltCard;
