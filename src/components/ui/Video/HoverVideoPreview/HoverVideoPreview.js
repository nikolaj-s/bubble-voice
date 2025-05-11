import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import styles from "./HoverVideoPreview.module.css";

const HoverVideoPreview = ({ src }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(err => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        className={styles.video}
        muted
        loop
        playsInline
      />
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Play size={48} color="var(--text-color)" />
      </motion.div>
    </div>
  );
};

export default HoverVideoPreview;
