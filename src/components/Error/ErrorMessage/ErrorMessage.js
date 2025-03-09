import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => (
  <div className={styles.errorMessage}>{message}</div>
);

export default ErrorMessage;
