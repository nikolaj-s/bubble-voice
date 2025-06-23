
import styles from "./LinkPreview.module.css";
import { ImageComponent } from "../ui/Image/Image";
import { useDispatch } from "react-redux";
import { setExpandedImage } from "../../features/Media/ExpandedImage/expandedImageSlice";
import { NsfwWrapper } from "../ui/Wrappers/NsfwWrapper/NsfwWrapper";
import VideoPlayer from "../ui/Video/VideoPlayer/VideoPlayer";

const LinkPreview = ({ link_preview: preview, nsfw }) => {
  const dispatch = useDispatch();

  const openPreview = (e) => {
    if (preview.video || preview.image) e.stopPropagation();
    console.log(preview)
    if (preview.image && !preview.video) dispatch(setExpandedImage(preview));
  };

  if (!preview) return null;

  const openLink = () => {
    window.open(preview.url, "_blank");
  };

  return (
    <div onClick={openLink} className={styles.linkPreview}>
      <div onClick={openPreview} className={styles.previewMedia}>
        <NsfwWrapper nsfw={nsfw ? { nsfw } : preview}>
          {preview.url.includes('youtu') ?
          <VideoPlayer src={preview.url} title={preview.title} />
          :
          preview.video ? (
            <VideoPlayer src={preview.video} title={preview.title} />
          ) : preview.image ? (
            <ImageComponent objectFit="contain" src={preview.image} />
          ) : null}
        </NsfwWrapper>
      </div>

      <div className={styles.previewContent}>
        <div className={styles.siteInfo}>
          {preview.favicon && (
            <img src={preview.favicon} alt="Favicon" className={styles.favicon} />
          )}
          <span className={styles.siteName}>{preview.siteName}</span>
        </div>
        <h3 className={styles.title}>{preview.title}</h3>
        <p className={styles.description}>{preview.description}</p>
      </div>
    </div>
  );
};

export default LinkPreview;
