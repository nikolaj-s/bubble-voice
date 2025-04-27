// components/EmbedPlaceholder/EmbedPlaceholder.jsx
import React from "react";
import { ImageOff } from "lucide-react";
import styles from "./EmbedPlaceholder.module.css";

export const EmbedPlaceholder = ({ message = "Embed content will appear here." }) => {
  return (
    <div className={styles.placeholder}>
      <ImageOff size={36} />
      <p>{message}</p>
    </div>
  );
};
