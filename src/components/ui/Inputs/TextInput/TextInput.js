import PropTypes from "prop-types";
import styles from "./TextInput.module.css";

const TextInput = ({ type = "text", placeholder, value, onChange, error, autoComplete, maxLength }) => {
  return (
    <div className={`${styles.inputContainer} ${error ? styles.error : ""}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {e.stopPropagation(); onChange(e.target.value)}}
        onKeyDown={(e) => {e.stopPropagation()}}
        onKeyUp={(e) => {e.stopPropagation()}}
        className={styles.input}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.oneOf(["text", "password", "email"]),
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  maxLength: PropTypes.number, // Error message (optional)
};

export default TextInput;
