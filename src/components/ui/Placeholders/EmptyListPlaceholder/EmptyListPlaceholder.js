import React from "react";
import { ListX } from "lucide-react";
import styles from "./EmptyListPlaceholder.module.css";

const EmptyListPlaceholder = ({ message = "No items to display." }) => {
  return (
    <div className={styles.placeholder}>
      <ListX className={styles.icon} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default EmptyListPlaceholder;
