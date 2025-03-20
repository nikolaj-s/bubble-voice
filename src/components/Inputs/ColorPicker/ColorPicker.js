import React, { useState } from "react";

import styles from "./ColorPicker.module.css";

const ColorPicker = ({ onColorChange }) => {
    
  const [selectedColor, setSelectedColor] = useState("#1e3a5f");

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    onColorChange(color);  // Callback to pass the selected color hex value to parent
  };

  return (
    <div className={styles.colorPickerContainer} style={{ backgroundColor: selectedColor }}>
      {/* Color Wheel Input */}
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        className={styles.colorWheel}
      />
      {/* Displaying Selected Color Hex */}
        <div 
        style={{
            backgroundColor: selectedColor
        }}
        className={styles.selectedColor}>
            <p >{selectedColor}</p>

        </div>
        
    </div>
  );
};

export default ColorPicker;
