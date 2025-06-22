import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react'; // Lucide icons
import styles from './MarkdownHelp.module.css';

const MarkdownHelp = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.markdownHelp}>
      <button
        className={styles.header}
        onClick={() => setOpen(o => !o)}
        type="button"
        aria-expanded={open}
      >
        <Info size={18} className={styles.icon} />
        <strong>Markdown supported!</strong>
        <span className={styles.chevron + (open ? ' ' + styles.open : '')}>
          <ChevronDown size={18} />
        </span>
        <span className={styles.tapHint}>{open ? 'Hide' : 'Show'} instructions</span>
      </button>
      <div
        className={styles.instructions}
        style={{
          display: open ? null : 'none',
          maxHeight: open ? 1000 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(.45,1.32,.68,1),opacity 0.2s',
        }}
      >
        <ul className={styles.examples}>
          <li>
            <span className={styles.code}>**bold text**</span>
            <span className={styles.result}>→ bold text</span>
          </li>
          <li>
            <span className={styles.code}>*italic text*</span>
            <span className={styles.result}>→ italic text</span>
          </li>
          <li>
            <span className={styles.code}>[link text](https://example.com)</span>
            <span className={styles.result}>→ link</span>
          </li>
          <li>
            <span className={styles.code}>![alt text](https://img.url)</span>
            <span className={styles.result}>→ image</span>
          </li>
          <li>
            <span className={styles.code}>- List item</span>
            <span className={styles.result}>→ • List</span>
          </li>
          <li>
            <span className={styles.code}>&#96;inline code&#96;</span>
            <span className={styles.result}>→ <code>inline code</code></span>
          </li>
          <li>
            <span className={styles.code}>{'> Quote'}</span>
            <span className={styles.result}>→ quote</span>
          </li>
        </ul>
        <div className={styles.tip}>
          More: <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">Markdown Cheat Sheet</a>
        </div>
      </div>
    </div>
  );
};

export default MarkdownHelp;
