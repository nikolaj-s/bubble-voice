import React from "react";
import { Image as ImageIcon, Video as VideoIcon, Link2 } from "lucide-react";
import styles from "./AttachmentPreview.module.css";

const AttachmentPreview = ({ reply, onClick }) => {
  // Prioritize: image > video > link > text
  if (reply.image) {
    return (
      <span className={styles.attachment} tabIndex={0} onClick={onClick} role="button">
        <ImageIcon size={18} className={styles.icon} />
        Click to see attachment
      </span>
    );
  }
  if (reply.video) {
    return (
      <span className={styles.attachment} tabIndex={0} onClick={onClick} role="button">
        <VideoIcon size={18} className={styles.icon} />
        Click to see attachment
      </span>
    );
  }
  if (reply.link) {
    return (
      <a
        href={reply.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <Link2 size={16} className={styles.icon} />
        {reply.link}
      </a>
    );
  }
  // Otherwise show text
  return <span className={styles.text}>{reply.text || ""}</span>;
};

export default AttachmentPreview;
