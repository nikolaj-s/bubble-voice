import React from 'react';
import styles from './Description.module.css';

export const Description = ({ description, limit, textAlign }) => {
  const useClamp = Number.isInteger(limit) && limit > 0;

  const clampStyle = useClamp
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: limit,
        overflow: 'hidden',
      }
    : {};

  return (
    <div className={styles.container} style={{textAlign}}>
      <p className={styles.text} style={clampStyle}>
        {description}
      </p>
    </div>
  );
};
