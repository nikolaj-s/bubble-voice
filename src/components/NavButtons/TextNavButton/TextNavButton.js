import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./TextNavButton.module.css";

const TextNavButton = ({ to, text, disabled = false }) => {
  return (
    <Link to={to} className={`${styles.button} ${disabled ? styles.disabled : ""}`} aria-disabled={disabled}>
      <p>{text}</p>
    </Link>
  );
};

TextNavButton.propTypes = {
  to: PropTypes.string.isRequired,  // Route path for navigation
  text: PropTypes.string.isRequired,  // Text to display on the button
  disabled: PropTypes.bool,  // Optional: Disable the button
};

export default TextNavButton;
