import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatusSwitcher.module.css';

const STATUS_OPTIONS = [
  { value: 'online', label: 'Online', color: '#76c7a5' },
  { value: 'away', label: 'Away', color: '#f5a623' },
  { value: 'offline', label: 'Offline', color: '#a0a0a0' },
];

const StatusSwitcher = ({ status, onChange }) => {
  return (
    <div className={styles.statusSwitcher}>
      {STATUS_OPTIONS.map(option => (
        <button
          key={option.value}
          className={`${styles.statusOption} ${status === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          <span
            className={styles.statusDot}
            style={{ backgroundColor: option.color }}
          />
          {option.label}
        </button>
      ))}
    </div>
  );
};

StatusSwitcher.propTypes = {
  status: PropTypes.oneOf(['online', 'away', 'offline']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StatusSwitcher;
