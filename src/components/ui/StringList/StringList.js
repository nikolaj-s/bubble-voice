import React from 'react';
import PropTypes from 'prop-types'; // For prop type checking
import styles from './StringList.module.css'; // Importing the CSS module

const StringList = ({ items }) => {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.title}>List of Strings</h3>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prop type validation
StringList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensures it's an array of strings
};

export default StringList;
