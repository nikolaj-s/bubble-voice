import React from 'react';
import styles from './SearchPromptPlaceholder.module.css';
import { Search } from 'lucide-react';

const SearchPromptPlaceholder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bubbleArt}>
        <div className={styles.bubble + ' ' + styles.bubble1}></div>
        <div className={styles.bubble + ' ' + styles.bubble2}></div>
        <div className={styles.bubble + ' ' + styles.bubble3}></div>
      </div>
      <div className={styles.content}>
        <Search size={48} className={styles.icon} />
        <h2 className={styles.title}>Ready to dive in?</h2>
        <p className={styles.subtitle}>Start typing to search your message ocean 🌊</p>
      </div>
    </div>
  );
};

export default SearchPromptPlaceholder;
