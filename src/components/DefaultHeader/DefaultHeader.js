import React from 'react';
import { ImageComponent } from '../ui/Image/Image';
import TextButton from '../ui/Buttons/TextButton/TextButton';
import { useNavigate } from 'react-router';

import styles from './DefaultHeader.module.css';

export const DefaultHeader = () => {

    const navigate = useNavigate();


    return (
        <header className={styles.header}>
                <div role='button' onClick={() => {navigate("/")}} className={styles.brand}>
                    <div className={styles.logo}><ImageComponent src={'https://bubble-media.net/uploads/36fb8578-4437-4349-97dc-03e6380f658a.png'} /></div>
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
