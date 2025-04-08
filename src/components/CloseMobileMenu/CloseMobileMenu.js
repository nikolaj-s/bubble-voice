import React from 'react';

import styles from './CloseMobileMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../features/Mobile/mobileSlice';

export const CloseMobileMenu = () => {

    const {isChannelMenuOpen, isUserMenuOpen, isServerMenuOpen} = useSelector(state => state.mobileSlice);

    const dispatch = useDispatch();

    return (
        <div className={`${styles.closeChannelMenu} ${(isChannelMenuOpen || isUserMenuOpen || isServerMenuOpen) && (styles.active)}`} onClick={() => {dispatch(toggleMobileMenu())}} />
    )
}
