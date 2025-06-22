import React, { useState, useRef, useEffect } from 'react';
import styles from './CodeInput.module.css';

/**
 * Renders a row of inputs for a fixed-length verification code.
 *
 * Props:
 * - length (number): number of characters (default 6)
 * - onChange (code: string) => void   called on every change
 * - onComplete (code: string) => void called once all inputs are filled
 */
export default function CodeInput({
  length = 6,
  onChange = () => {},
  onComplete = () => {}
}) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  // Focus next input on value change
  useEffect(() => {
    const firstEmpty = values.findIndex(v => v === '');
    if (firstEmpty !== -1) {
      inputsRef.current[firstEmpty]?.focus();
    } else {
      // all filled
      onComplete(values.join(''));
    }
    onChange(values.join(''));
  }, [values, onChange, onComplete]);

  // Handle paste (e.g. full code)
  const handlePaste = e => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, length).split('');
    if (paste.every(c => /^[A-Za-z0-9]$/.test(c))) {
      const newVals = [...values];
      for (let i = 0; i < paste.length; i++) {
        newVals[i] = paste[i];
      }
      setValues(newVals);
    }
  };

  const handleChange = (e, idx) => {
    const char = e.target.value.slice(-1);
    if (!/^[A-Za-z0-9]$/.test(char) && char !== '') return;
    const newVals = [...values];
    newVals[idx] = char;
    setValues(newVals);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && values[idx] === '') {
      // move previous
      const prev = idx - 1;
      if (prev >= 0) {
        inputsRef.current[prev]?.focus();
        setValues(vals => {
          const nv = [...vals];
          nv[prev] = '';
          return nv;
        });
      }
    }
  };

  return (
    <div className={styles.container} onPaste={handlePaste}>
      {values.map((val, i) => (
        <input
          key={i}
          type="text"
          inputMode="text"
          maxLength={1}
          className={styles.input}
          value={val}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          ref={el => (inputsRef.current[i] = el)}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
