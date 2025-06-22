import React from "react";
import PropTypes from "prop-types";
import styles from "./TextButton.module.css";

const TextButton = ({ title, disabled, action, backgroundColor, maxWidth, icon: Icon }) => {
  
  return (
    <>
    
    <button
      style={{
        backgroundColor,
        maxWidth
      }}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      onClick={action}
      disabled={disabled}
    >
      {title}
      {React.isValidElement(Icon) ? Icon : typeof Icon === 'function' || typeof Icon === 'object' ? <Icon color='var(--text-color)' size={16} strokeWidth={2.5} /> : null}
    </button>
    
    </>
  );
};

TextButton.propTypes = {
  title: PropTypes.string.isRequired,  // Button text
  disabled: PropTypes.bool,            // Whether the button is disabled
  action: PropTypes.func.isRequired,   // Action to trigger on click
};

export default TextButton;
