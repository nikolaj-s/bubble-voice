import React, { useState } from "react";

import styles from './KeybindInput.module.css'

const KeybindInput = ({ currentKeybind, onChange }) => {
  const [keybind, setKeybind] = useState(currentKeybind || "None");
  const [listening, setListening] = useState(false);

  const handleKeyDown = (event) => {
    event.preventDefault(); // Prevent default browser actions
    if (["Control", "Alt", "Meta"].includes(event.key)) return;

    const newKey = event.key.toUpperCase();
    setKeybind(newKey);
    onChange(newKey);
    setListening(false);
  };

  const startListening = () => {
    setListening(true);
    window.addEventListener("keydown", handleKeyDown);
  };

  const stopListening = () => {
    setListening(false);
    window.removeEventListener("keydown", handleKeyDown);
  };

  return (
    <button
      onClick={startListening}
      onBlur={stopListening}
      className={styles['keybind-button']}
    >
      {listening ? "Press a key..." : keybind}
    </button>
  );
};

export default KeybindInput;
