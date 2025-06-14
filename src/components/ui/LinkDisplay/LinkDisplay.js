import { useState } from 'react';
import styles from './LinkDisplay.module.css';
import { Copy, Check } from 'lucide-react';
import IconButton from '../Buttons/IconButton/IconButton';

export const LinkDisplay = ({ value = 'None', label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value || value === 'None') return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.linkText}>{value}</span>
      <IconButton 
      title={copied ? 'Copied' : 'Copy'}
      onClick={handleCopy}
      Icon={copied ? <Check color='var(--text-color)' /> : <Copy color='var(--text-color)' />}
      />
    </div>
  );
};
