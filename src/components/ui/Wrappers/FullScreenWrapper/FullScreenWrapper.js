import { motion } from "framer-motion";
import styles from "./FullScreenWrapper.module.css"; // Assuming you're using CSS modules
import { useIsMobile } from "../../../../hooks/useIsMobile";

const FullScreenWrapper = ({
  children,
  onClose,
  maxContentWidth = 800,
  backgroundColor = 'var(--background-color)',
  width,
  exitFromY = 0
}) => {
  const handleWrapperClick = () => {
    onClose();
  };

  const isMobile = useIsMobile(730);

  const exitAnimation = isMobile
  ? { opacity: 0, y: 0 } // No pop-down effect on mobile
  : { opacity: 0, y: "100%" };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'var(--overlay-color)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      transition={{ duration: 0.18 }}
    >
      <motion.div
        style={{
          maxWidth: maxContentWidth,
          width,
        }}
        className={styles.content}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={exitAnimation}
        transition={{ type: "spring", stiffness: 420, damping: 35, duration: 0.26 }}
      >
        {children}
      </motion.div>
      <div className={styles.closeListener} onClick={handleWrapperClick} />
    </motion.div>
  );
};

export default FullScreenWrapper;
