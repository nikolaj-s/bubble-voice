import React, { useState } from "react";
import styles from "./KeybindInput.module.css";

const KeybindInput = ({ currentKeybind, onChange }) => {
  const [keybind, setKeybind] = useState("None");
  const [listening, setListening] = useState(false);

  React.useEffect(() => {

    setKeybind(currentKeybind?.key || "None")

  }, [])

  const handleKeyDown = (event) => {
    event.preventDefault(); // Prevent default browser actions
    if (["Control", "Alt", "Meta"].includes(event.key)) return;

    const newKey = event.key.toUpperCase();
    setKeybind(newKey);
    onChange({ key: newKey, keyCode: event.code });
    stopListening();
  };

  const handleMouseDown = (event) => {
    // Ignore Left (0) & Right (2) Clicks
    if (event.button === 0 || event.button === 2) return;

    const mouseButton = event.button === 3 ? "Mouse Button 4" : "Mouse Button 5";
    setKeybind(mouseButton);
    onChange({ key: mouseButton, keyCode: `Mouse${event.button}` });
    stopListening();
  };

  const startListening = () => {
    setListening(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
  };

  const stopListening = () => {
    setListening(false);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("mousedown", handleMouseDown);
  };

  return (
    <button
      style={{
        width: listening ? 150 : 80
      }}
      onClick={startListening}
      onBlur={stopListening}
      className={styles["keybind-button"]}
    >
      {listening ? "Press a key..." : keybind}
    </button>
  );
};

export default KeybindInput;

