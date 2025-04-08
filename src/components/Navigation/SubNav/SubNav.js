import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import styles from './SubNav.module.css';
import { LineSpacer } from '../../ui/Spacers/LineSpacer/LineSpacer';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from '../../../features/Mobile/mobileSlice';

export const SubNav = ({basePath = '/dashboard', options = []}) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  // Helper to normalize paths by removing trailing slashes.
  const normalizePath = (path) => path.replace(/\/+$/, '');

  const currentPath = normalizePath(location.pathname);

  const closeMobileMenu = () => {
    dispatch(toggleMobileMenu())
  }

  return (
    <nav className={styles.subNav}>

      {options.map((option) => {

        const optionPathNormalized = normalizePath(option.path);

        const active = currentPath === optionPathNormalized;
        return (
          <button
            key={option.label}
            onClick={() => {closeMobileMenu(); navigate(option.path)}}
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
