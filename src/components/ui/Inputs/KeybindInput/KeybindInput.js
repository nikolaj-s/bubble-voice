import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import styles from "./KeybindInput.module.css";

const KeybindInput = ({ currentKeybind, onChange }) => {
  const [keybind, setKeybind] = useState("None");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    setKeybind(currentKeybind?.key || "None");
  }, [currentKeybind]);

  // Clean event listener management
  useEffect(() => {
    if (!listening) return;

    const handleKeyDown = (event) => {
      event.preventDefault();
      if (["Control", "Alt", "Meta"].includes(event.key)) return;
      const newKey = event.key.toUpperCase();
      setKeybind(newKey);
      onChange({ key: newKey, keyCode: event.code });
      setListening(false);
    };

    const handleMouseDown = (event) => {
      if (event.button < 3) return;
      const mouseButton =
        event.button === 3 ? "Mouse Button 4" : "Mouse Button 5";
      setKeybind(mouseButton);
      onChange({ key: mouseButton, keyCode: `Mouse${event.button}` });
      setListening(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    // Clean up listeners on stop listening or unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [listening, onChange]);

  const startListening = () => setListening(true);

  const handleClear = (e) => {
    e.stopPropagation();
    setListening(false);
    setKeybind("None");
    onChange(null);
  };

  return (
    <button
      type="button"
      onClick={startListening}
      onBlur={() => setListening(false)}
      className={`${styles["keybind-button"]} ${listening ? styles.listening : ""}`}
      style={{ width: listening ? 150 : 120 }}
    >
      <span className={styles.label}>
        {listening ? "Press a key..." : keybind}
      </span>
      {!listening && keybind !== "None" && (
        <X className={styles.clearIcon} onClick={handleClear} />
      )}
    </button>
  );
};

export default KeybindInput;
