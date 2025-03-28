import React from "react";
import styles from "./LinkPreview.module.css";
import { ImageComponent } from "../Image/Image";

const LinkPreview = ({ preview }) => {
  if (!preview) return null;

  return (
    <a href={preview.url} target="_blank" rel="noopener noreferrer" className={styles.linkPreview}>
      {preview.images.length > 0 && 
      <div className={styles.previewImage} >
        <ImageComponent src={preview.images[0]}  />
      </div>
      }
      <div className={styles.previewContent}>
        <div className={styles.siteInfo}>
          {preview.favicons.length > 0 && <img src={preview.favicons[0]} alt="Favicon" className={styles.favicon} />}
          <span className={styles.siteName}>{preview.siteName}</span>
        </div>
        <h3 className={styles.title}>{preview.title}</h3>
        <p className={styles.description}>{preview.description}</p>
      </div>
    </a>
  );
};

export default LinkPreview;
