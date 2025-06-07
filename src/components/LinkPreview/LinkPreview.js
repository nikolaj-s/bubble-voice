import React from "react";
import styles from "./LinkPreview.module.css";
import { ImageComponent } from "../ui/Image/Image";
import HoverVideoPreview from "../ui/Video/HoverVideoPreview/HoverVideoPreview";
import { NsfwWrapper } from "../ui/Wrappers/NsfwWrapper/NsfwWrapper";
import { useDispatch } from "react-redux";
import { setExpandedImage } from "../../features/Media/ExpandedImage/expandedImageSlice";

const LinkPreview = ({ link_preview: preview, nsfw }) => {

  const dispatch = useDispatch();

  const openPreview = (e) => {
    

    if (preview.image) {
      e.stopPropagation(); 
      
      dispatch(setExpandedImage(preview.image));
    }
  }

  if (!preview) return null;

  const openLink = () => {
    window.open(preview.url, "_blank");
  }

  return (
    <div onClick={openLink} className={`${styles.linkPreview} ${preview.type === 'reddit' || preview.video ? styles.reddit : null}`}>
      <div onClick={openPreview} className={`${styles.previewImage} ${preview.type === 'reddit' || preview.video ? styles.redditImage : null}`} >
          <NsfwWrapper nsfw={nsfw ? {nsfw} : preview} >
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
      <div className={`${styles.previewContent} ${preview.type === 'reddit' || preview.video ? styles.redditPreviewContent : null}`}>
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
