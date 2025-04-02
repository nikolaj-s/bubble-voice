import React from "react";
import { X } from "lucide-react";
import styles from "./SimilarImageButton.module.css";

const SimilarImageButton = ({ src, onRemove }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt="Similar" className={styles.image} />
      <button className={styles.closeButton} onClick={onRemove}>
        <X size={16} />
      </button>
    </div>
  );
};

export default SimilarImageButton;
