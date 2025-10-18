import React from 'react';

import styles from './DefaultFooter.module.css'
import { Link } from 'react-router-dom';

export const DefaultFooter = () => {
  return (
    <footer className={styles.footer}>
        <div>© {new Date().getFullYear()} Bubble — Built for small communities.</div>
        <div className={styles.footerLinks}><Link to="/privacy-policy" >Privacy</Link><Link to="/terms-and-conditions">Terms</Link><Link to="/patch-notes">Patch Notes</Link></div>
    </footer>
  )
}
