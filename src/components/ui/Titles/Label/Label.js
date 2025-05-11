import PropTypes from "prop-types";
import styles from "./Label.module.css";

const Label = ({ label, margin, fontSize }) => {
  return (
    <label style={{margin, fontSize}} className={styles.label}>
      {label}
    </label>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired, // Label text
};

export default Label;
