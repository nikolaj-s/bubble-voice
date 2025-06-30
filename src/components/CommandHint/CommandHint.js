import React, { useEffect, useState } from 'react';
import styles from './CommandHint.module.css';
import { ImageIcon, VideoIcon, } from 'lucide-react';

const commandList = [
  {
    command: '/image',
    description: 'Finds an image based on the query after the command.',
    icon: <ImageIcon size={16} />,
  },
  {
    command: '/video',
    description: 'Finds a video based on the query after the command.',
    icon: <VideoIcon size={16} />,
  },
];

export const CommandHint = ({ value = '', setValue }) => {
    
  const trimmed = value.trim();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [commandQuery] = trimmed.split(' ');

  // fuzzy matching — starts with or contains query
  const options = commandList.filter(({ command }) =>
    command.toLowerCase().includes(commandQuery.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0); // reset when options change
  }, [options]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (options.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        if (options[selectedIndex]) {
          e.preventDefault();
          setValue(options[selectedIndex].command + ' ');
          document.getElementById('chat-input').focus()
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedIndex, setValue]);

  if (!trimmed.startsWith('/')) return null;

  if (options.length === 0) return null;

  return (
    <div className={styles.hintContainer}>
      {options.map(({ command, description, icon }, i) => (
        <div
          key={command}
          className={`${styles.hint} ${i === selectedIndex ? styles.active : ''}`}
          onMouseEnter={() => setSelectedIndex(i)}
          onMouseDown={(e) => {
            e.preventDefault();
            setValue(command + ' ');
          }}
        >
          <div className={styles.icon}>{icon}</div>
          <div>
            <strong>{command}</strong>: {description}
          </div>
        </div>
      ))}
    </div>
  );
};
