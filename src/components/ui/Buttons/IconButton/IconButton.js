import { motion } from "framer-motion";

import styles from "./IconButton.module.css";

import Tooltip from '../../ToolTip/ToolTip'

const IconButton = ({
  Icon,
  title,
  onClick,
  position = "top",
  className = "",
  width,
  height,
  backgroundColor = 'rgba(0,0,0,0)',
  backgroundHover = 'var(--button-hover)',
  padding = 5,
  borderRadius,
  margin
}) => {
  
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  }
  return (
    <Tooltip content={title} position={position}>
      <motion.button
        style={{width, height, backgroundColor, padding, borderRadius, margin }}
        onClick={handleClick}
        className={`${styles.button} ${className}`}
        whileHover={{ backgroundColor: backgroundHover}}
        whileTap={{ scale: 0.9 }}
      >
        {Icon}
      </motion.button>
    </Tooltip>
  );
};

export default IconButton;