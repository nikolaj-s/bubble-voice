import React from 'react';
import { ImageComponent } from '../ui/Image/Image';
import TextButton from '../ui/Buttons/TextButton/TextButton';
import { useNavigate } from 'react-router';

import styles from './DefaultHeader.module.css';
import { Logo } from '../Icons/Bubble/Logo';

export const DefaultHeader = () => {

    const navigate = useNavigate();


    return (
        <header className={styles.header}>
                <div role='button' onClick={() => {navigate("/")}} className={styles.brand}>
                    <div className={styles.logo}><Logo /></div>
                    <div>
                        <div className={styles.brandTitle}>Bubble</div>
                        <div className={styles.brandSubtitle}>Micro communities · voice · play</div>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <TextButton action={() => {navigate('/login')}} title='Login' backgroundColor={'var(--background-color)'} />
                    <TextButton action={() => {navigate('/signup')}} title='Get Started' />
                </nav>

                <div className={styles.mobileMenu}>Menu</div>
        </header>
    )
}
