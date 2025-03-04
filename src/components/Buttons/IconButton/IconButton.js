import { motion } from "framer-motion";

import styles from "./IconButton.module.css";

import Tooltip from '../../ui/ToolTip/ToolTip'

const IconButton = ({
  Icon,
  title,
  onClick,
  position = "top",
  className = "",
}) => {
  
  return (
    <Tooltip content={title} position={position}>
      <motion.button
        onClick={onClick}
        className={`${styles.button} ${className}`}
        whileHover={{ opacity: 0.75 }}
        whileTap={{ scale: 0.9 }}
      >
        {Icon}
      </motion.button>
    </Tooltip>
  );
};

export default IconButton;