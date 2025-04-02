import React from "react";
import styles from "./LinkPreview.module.css";
import { ImageComponent } from "../ui/Image/Image";
import HoverVideoPreview from "../ui/Video/HoverVideoPreview/HoverVideoPreview";
import { NsfwWrapper } from "../ui/Wrappers/NsfwWrapper/NsfwWrapper";

const LinkPreview = ({ preview }) => {

  if (!preview) return null;

  const openLink = () => {
    window.open(preview.url, "_blank");
  }

  return (
    <div onClick={openLink} className={`${styles.linkPreview} ${preview.type === 'reddit' ? styles.reddit : null}`}>
      <div className={`${styles.previewImage} ${preview.type === 'reddit' ? styles.redditImage : null}`} >
          <NsfwWrapper nsfw={preview} >
            <div className={`${styles.mediaWrapper} ${preview.type === 'reddit' ? styles.redditMediaWrapper : null}`} >
              {
              preview.video ?
              <HoverVideoPreview src={preview.video} />
              :
              preview.image ?
              <ImageComponent src={preview.image}  />
              : 
              null
              }
            </div>
          </NsfwWrapper>
      </div> 
      <div className={`${styles.previewContent} ${preview.type === 'reddit' ? styles.redditPreviewContent : null}`}>
        <div className={styles.siteInfo}>
          {preview.favicon && <img src={preview.favicon} alt="Favicon" className={styles.favicon} />}
          <span className={styles.siteName}>{preview.siteName}</span>
        </div>
        <h3 className={styles.title}>{preview.title}</h3>
        <p className={styles.description}>{preview.description}</p>
      </div>
    </div>
  );
};

export default LinkPreview;
