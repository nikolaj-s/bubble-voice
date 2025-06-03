import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react"; // Or any icon for closing
import styles from "./ExpandedImageViewer.module.css";
import { getImageColor } from "../../lib/services/getImageColor";

const ExpandedImageViewer = ({ src, alt, open, onClose, context }) => {

  const [color, setColor] = useState(null)

  const [expanded, setExpanded] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {

    const handleImageColor = async () => {
      const res = await getImageColor(src);

      setColor(`rgba(${res.r}, ${res.g}, ${res.b}, 0.98)`);
    }

    handleImageColor();

  }, [src])

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div data-context={JSON.stringify(context)} className={styles.overlay} style={{backgroundColor: color}} >
      <div className={styles.closeOverlay} onClick={onClose} />
      <button className={styles.close} onClick={onClose} aria-label="Close image">
        <X size={28} />
      </button>
      <div
        ref={scrollRef}
        className={`${styles.imageContainer} ${expanded ? styles.expanded : ""}`}
        onClick={e => { 
          setExpanded(exp => !exp); // toggle expand
        }}
        tabIndex={0}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={styles.image}
          style={{
            width: expanded ? "100vw" : "auto",
            maxWidth: expanded ? "none" : "90vw",
            maxHeight: expanded ? "none" : "90vh",
            cursor: expanded ? "grab" : "zoom-in",
          }}
        />
      </div>
    </div>
  );
};

export default ExpandedImageViewer;
