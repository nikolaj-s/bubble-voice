import React from 'react';
import styles from './MicroFooter.module.css';
import { Subtitle } from '../ui/Titles/Subtitle/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentVersion } from '../../features/PatchNotes/Thunks/getCurrentVersion';

export default function MicroFooter() {

  const dispatch = useDispatch();

  const {currentVersion, loading} = useSelector(state => state.patchNotesSlice);

  React.useEffect(() => {

    if (loading) return;

    if (!currentVersion) {
      dispatch(getCurrentVersion());
    }

  }, [currentVersion])

  const links = [
    { label: 'Patch Notes', href: '/patch-notes' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ];

  return (
    <footer className={styles.microFooter}>
      <Subtitle margin={'0px 0px 10px 0px'}>App Ver: {currentVersion}</Subtitle>
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
