import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import styles from "./ErrorPopup.module.css";

const ErrorPopup = ({ errorMessage, onClose }) => {
  return (
    <div 
    className={styles.backdrop} onClick={onClose}>
      <motion.div
        className={styles.errorCard}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <AlertCircle className={styles.errorIcon} />
        <p className={styles.errorMessage}>{errorMessage}</p>
        <button className={styles.errorClose} onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
};

export default ErrorPopup;
