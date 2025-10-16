import React from 'react';
import styles from './MicroFooter.module.css';

export default function MicroFooter() {
  const links = [
    { label: 'Patch Notes', href: '/patch-notes' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ];

  return (
    <footer className={styles.microFooter}>
      <nav className={styles.linkColumn}>
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {label}
          </a>
        ))}
      </nav>
      <p className={styles.copy}>© {new Date().getFullYear()} Bubble</p>
    </footer>
  );
}
