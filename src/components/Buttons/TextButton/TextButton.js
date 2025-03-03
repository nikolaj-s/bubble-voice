import PropTypes from "prop-types";
import styles from "./TextButton.module.css";

const TextButton = ({ title, disabled, action }) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      onClick={action}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

TextButton.propTypes = {
  title: PropTypes.string.isRequired,  // Button text
  disabled: PropTypes.bool,            // Whether the button is disabled
  action: PropTypes.func.isRequired,   // Action to trigger on click
};

export default TextButton;
