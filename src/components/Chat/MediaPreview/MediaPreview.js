import React from "react";
import styles from "./MediaPreview.module.css";
import { ImageComponent } from "../../ui/Image/Image";
import { X } from "lucide-react";
import IconButton from "../../ui/Buttons/IconButton/IconButton";

export const MediaPreview = ({ preview, clear }) => {
  const list = Array.isArray(preview) ? preview : [preview];

  return (
    <div className={styles.container}>
      <div className={styles.scroller}>
        {list.map((src, idx) => (
          <div key={idx} className={styles.card}>
            <ImageComponent src={src} />
          </div>
        ))}
      </div>

      <div onClick={clear} className={styles.overlay}>
        <IconButton 
        title={'Clear Images'}
        onClick={clear}
        Icon={X}
        backgroundColor="var(--error-color)"
        />
      </div>
    </div>
  );
};
