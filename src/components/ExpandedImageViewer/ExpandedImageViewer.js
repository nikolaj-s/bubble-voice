import { useState, useRef, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react"; // Or any icon for closing
import styles from "./ExpandedImageViewer.module.css";
import { getImageColor } from "../../lib/services/getImageColor";

import IconButton from "../ui/Buttons/IconButton/IconButton";
import { ToolBar } from "../ui/Wrappers/ToolBar/ToolBar";
import { MediaInfo } from "../MediaInfo/MediaInfo";
import { ExpandedMediaWrapper } from "../ui/Wrappers/ExpandedMediaWrapper/ExpandedMediaWrapper";

const ExpandedImageViewer = ({ src, alt, open, onClose, context }) => {

  const [color, setColor] = useState(null)

  const [expanded, setExpanded] = useState(false);

  const [error, toggleError] = useState(false);

  const scrollRef = useRef();

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  const handleExpand = (e) => {

    setExpanded(!expanded);
    
    requestAnimationFrame(() => {
      scrollRef.current.scrollTo(e.clientX, e.clientY * 1.5)
    })
    

  }
  
  if (!open) return null;

  return (
    <ExpandedMediaWrapper onClose={onClose} context={context} >
      <div
        ref={scrollRef}
        className={`${styles.imageContainer} ${expanded ? styles.expanded : ""}`}
        onClick={handleExpand}
        tabIndex={0}
      >
        {error ?
        <AlertTriangle size={50} color="var(--error-color)" /> 
        : <img
          src={src}
          alt={alt}
          draggable={false}
          className={styles.image}
          onError={() => {toggleError(true)}}
          style={{
            height: expanded ? "200vh" : null,
            maxWidth: expanded ? "none" : "90vw",
            maxHeight: expanded ? "none" : "90vh",
            cursor: expanded ? "grab" : "zoom-in",
          }}
        />}
      </div>
    </ExpandedMediaWrapper>
  );
};

export default ExpandedImageViewer;
