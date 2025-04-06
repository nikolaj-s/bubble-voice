import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentPlaceholder.module.css';

const ContentPlaceholder = ({ title, message }) => {
  return (
    <div className={styles.placeholderContainer}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.bubblesContainer}>
        <div
          className={styles.bubble}
          style={{ '--bubble-size': '60px', '--bubble-left': '10%', '--animation-delay': '0s' }}
        />
        <div
          className={styles.bubble}
          style={{ '--bubble-size': '80px', '--bubble-left': '50%', '--animation-delay': '1s' }}
        />
        <div
          className={styles.bubble}
          style={{ '--bubble-size': '40px', '--bubble-left': '80%', '--animation-delay': '2s' }}
        />
        <div
          className={styles.bubble}
          style={{ '--bubble-size': '70px', '--bubble-left': '30%', '--animation-delay': '0.5s' }}
        />
        <div
          className={styles.bubble}
          style={{ '--bubble-size': '50px', '--bubble-left': '65%', '--animation-delay': '1.5s' }}
        />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

ContentPlaceholder.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default ContentPlaceholder;
