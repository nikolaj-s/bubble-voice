import React from "react";
import { motion } from "framer-motion";
import styles from "./ConfirmationPopup.module.css";
import { AlertCircle } from "lucide-react";

const ConfirmationPopup = ({ message, onConfirm, onCancel, icon: Icon = AlertCircle }) => {
  return (
    <div className={styles.overlay}>
      <motion.div 
        className={styles.popup}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <Icon color={'var(--text-color)'} size={40} />
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button className={styles.confirm} onClick={onConfirm}>Confirm</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPopup;
