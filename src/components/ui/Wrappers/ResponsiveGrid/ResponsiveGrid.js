import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResponsiveGrid.module.css';

const ResponsiveGrid = ({ children }) => {
  const flattened = React.Children.toArray(children).flat();

  return (
    <div className={styles.grid}>
      {flattened.map((child, index) => (
        <div className={styles.card} key={index}>
          {child}
        </div>
      ))}
    </div>
  );
};

ResponsiveGrid.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveGrid;
