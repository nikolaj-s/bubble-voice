import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import styles from './SubNav.module.css';
import { LineSpacer } from '../../ui/Spacers/LineSpacer/LineSpacer';

export const SubNav = ({basePath = '/dashboard', options = []}) => {

  const navigate = useNavigate();

  const location = useLocation();

  // Helper to normalize paths by removing trailing slashes.
  const normalizePath = (path) => path.replace(/\/+$/, '');

  const currentPath = normalizePath(location.pathname);

  return (
    <nav className={styles.subNav}>

      {options.map((option) => {

        const optionPathNormalized = normalizePath(option.path);

        const active = currentPath === optionPathNormalized;
        return (
          <button
            key={option.label}
            onClick={() => navigate(option.path)}
            className={`${styles.navButton} ${active ? styles.active : ''}`}
          >
            {option.icon}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
      <LineSpacer />
    </nav>
  );
};
