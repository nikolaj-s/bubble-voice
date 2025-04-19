import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './RandomHeader.module.css';

const RandomHeader = ({ titles, className = '' }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (titles && titles.length > 0) {
      const random = titles[Math.floor(Math.random() * titles.length)];
      setSelected(random);
    }
  }, [titles]);

  return (
    <h2 className={`${styles.header} ${className}`}>
      {selected}
    </h2>
  );
};

RandomHeader.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default RandomHeader;
