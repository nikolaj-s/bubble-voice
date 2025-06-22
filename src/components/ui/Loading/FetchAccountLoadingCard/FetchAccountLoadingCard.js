import React from 'react';
import styles from './FetchAccountLoadingCard.module.css';

export default function FetchAccountLoadingCard() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Fetching your account…</h2>
        <div className={styles.spinner} />
      </div>
    </div>
  );
}
