// File: BubbleLanding.jsx
// Single-file React component for a modern Bubble landing page using CSS Modules.
// Save the JSX as `BubbleLanding.jsx` and the CSS below as `BubbleLanding.module.css` next to it.

import React from 'react';
import styles from './LandingPage.module.css';
import ScrollLoadWrapper from '../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { useNavigate } from 'react-router';
import TextButton from '../../components/ui/Buttons/TextButton/TextButton';
import { ImageComponent } from '../../components/ui/Image/Image';
import FeaturesSection from './FeatureSection/FeatureSection';
import SkewedGallery from '../../components/SkewedGallery/SkewedGallery';

export const LandingPage = () => {

    const navigate = useNavigate();



    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.brand}>
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
        <ScrollLoadWrapper style={{
            maxHeight: 'calc(100svh - 80px)',
            backgroundColor: 'var(--overlay-color)'
        }} >

        <main className={styles.main}>
        
            <section className={styles.heroText}>
            <h1 className={styles.h1}>Create micro communities that feel like home</h1>
            <p className={styles.lead}>Bubble helps you form small, focused groups — game, chat, or discuss with friends. Discover communities built for real connection and instant voice/video hangouts.</p>

           

            <div className={styles.featuresInline}>
                <div className={styles.featureItem}><div className={styles.icon}>🎧</div><div><div className={styles.featureTitle}>Voice & Video</div><div className={styles.featureDesc}>Jump instantly into synced voice or video rooms.</div></div></div>
                <div className={styles.featureItem}><div className={styles.icon}>🕹️</div><div><div className={styles.featureTitle}>Play Together</div><div className={styles.featureDesc}>Share games and co-watch sessions with friends.</div></div></div>
                <div className={styles.featureItem}><div className={styles.icon}>🔖</div><div><div className={styles.featureTitle}>Discover</div><div className={styles.featureDesc}>Find niche groups and topics curated by real members.</div></div></div>
                <div className={styles.featureItem}><div className={styles.icon}>🔒</div><div><div className={styles.featureTitle}>Private by Default</div><div className={styles.featureDesc}>Small communities, low noise, high trust.</div></div></div>
            </div>
            </section>

            <aside className={styles.heroMedia}>
            <div className={styles.heroImage}>
            <ImageComponent objectFit='contain' src={'https://bubble-media.net/uploads/cc614896-b237-48d5-af1d-29672cb114ae.png'} />
              <div className={styles.liveTag}>Live demo</div>
            </div>

            <div className={styles.thumbs}>
                <ImageComponent  src={'https://bubble-media.net/uploads/331d1467-d1fc-49c1-8b67-c3074f743c42.png'} />
                <ImageComponent  src={'https://bubble-media.net/uploads/847fc6ea-b570-4dcd-ad4e-c43f04d26693.png'} />
                <ImageComponent src={'https://bubble-media.net/uploads/0be1406f-88ec-4f0b-b9cd-5b40ecac55f2.png'}  />
            </div>
            </aside>
        </main>

        <FeaturesSection />
        <section id="gallery" className={styles.gallery}>
            <h2>PWA / Mobile Optimized</h2>
            <div className={styles.galleryGrid}>
            <div className={styles.galleryCard}><img src="https://bubble-media.net/uploads/1c3c2a74-1c12-4fc2-90e0-ed33057ea9fa.png" alt="screen1" /></div>
            <div className={styles.galleryCard}><img src="https://bubble-media.net/uploads/d002892d-41cd-4f09-b9be-74ba47ab692f.png" alt="screen2" /></div>
            <div className={styles.galleryCard}><img src="https://bubble-media.net/uploads/c52c6b42-89ad-400a-a463-3f6d56427fd3.png" alt="screen3" /></div>
             <div className={styles.galleryCard}><img src="https://bubble-media.net/uploads/f8f6ec11-d4cc-4d20-aaaa-b69824170f05.png" alt="screen3" /></div>
            </div>
        </section>
        <section className={styles.ctaStrip}>
            <div className={styles.ctaInner}>
            <div>
                <div className={styles.ctaTitle}>Start your first Bubble</div>
                <div className={styles.ctaSubtitle}>Create a private space for your friends or community in seconds.</div>
            </div>
            <div className={styles.ctaBtns}>
                <TextButton title='Get Started' action={() => {navigate('/signup')}} />
            </div>
            </div>
        </section>
        <footer className={styles.footer}>
            <div>© {new Date().getFullYear()} Bubble — Built for small communities.</div>
            <div className={styles.footerLinks}><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div>
        </footer>
        </ScrollLoadWrapper>
        
        </div>
    );
    }

/* ------------------------------------------------------------------ */
/* File: BubbleLanding.module.css                                      */
/* Save this content as BubbleLanding.module.css next to BubbleLanding.jsx */


