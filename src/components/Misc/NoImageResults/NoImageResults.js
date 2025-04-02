import React from "react";
import { ImageOff } from "lucide-react";
import styles from "./NoImageResults.module.css";

const NoImageResults = () => {
  return (
    <div className={styles.container}>
      <ImageOff className={styles.icon} size={48} />
      <p className={styles.message}>Oops! Looks like this image is playing hide and seek. Try another search!</p>
    </div>
  );
};

export default NoImageResults;
