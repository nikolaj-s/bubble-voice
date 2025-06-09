import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import styles from './SubNav.module.css';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../../features/Mobile/mobileSlice';
import { setVoiceChannelFocused } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';

export const SubNav = ({basePath = '/dashboard', options = []}) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const {currentVoiceChannel, focused} = useSelector(state => state.voiceChannelSlice);

  // Helper to normalize paths by removing trailing slashes.
  const normalizePath = (path) => path.replace(/\/+$/, '');

  const currentPath = normalizePath(location.pathname);

  const closeMobileMenu = () => {
    dispatch(toggleMobileMenu())
  }

  const handleNavigate = (path) => {

    dispatch(setVoiceChannelFocused(false));

    navigate(path)

  }

  return (
    <nav className={styles.subNav}>

      {options.map((option) => {

        const optionPathNormalized = normalizePath(option.path);

        const active = currentPath === optionPathNormalized && !focused;
        return (
          <button
            key={option.label}
            onClick={() => {closeMobileMenu(); handleNavigate(option.path)}}
            className={`${styles.navButton} ${active ? styles.active : ''}`}
          >
            {option.icon}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
      <LineSpacer margin={'15px 0px'} />
    </nav>
  );
};
