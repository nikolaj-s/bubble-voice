import PropTypes from "prop-types";
import styles from "./TextInput.module.css";
import IconButton from "../../Buttons/IconButton/IconButton";
import { X } from "lucide-react";

const TextInput = ({ type = "text", placeholder = "", value, onChange, error, autoComplete, maxLength, onClear, id }) => {
  return (
    <div className={`${styles.inputContainer} ${error || (typeof maxLength === 'number' && value.length === maxLength) ? styles.error : ""}`}>
      <input
        id={id}
        type={type}
        placeholder={placeholder.toLowerCase()}
        value={value}
        onChange={(e) => {e.stopPropagation(); onChange(e.target.value)}}
        onKeyDown={(e) => {e.stopPropagation()}}
        onKeyUp={(e) => {e.stopPropagation()}}
        className={styles.input}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
      {(typeof onClear === 'function' && value.length > 0) && (<div className={styles.onClear}><IconButton title={'Clear'} onClick={onClear} Icon={X} /></div>)}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.oneOf(["text", "password", "email"]),
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string || PropTypes.bool,
  maxLength: PropTypes.number, // Error message (optional)
};

export default TextInput;
