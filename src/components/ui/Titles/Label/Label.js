import PropTypes from "prop-types";
import styles from "./Label.module.css";

const Label = ({ label, margin }) => {
  return (
    <label style={{margin}} className={styles.label}>
      {label}
    </label>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired, // Label text
};

export default Label;
