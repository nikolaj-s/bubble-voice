import PropTypes from "prop-types";
import styles from "./Label.module.css";

const Label = ({ label }) => {
  return (
    <label className={styles.label}>
      {label}
    </label>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired, // Label text
};

export default Label;
