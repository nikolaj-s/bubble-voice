// components/ApplyChangesPopup/ApplyChangesPopup.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ApplyChangesPopup.module.css";
import TextButton from "../ui/Buttons/TextButton/TextButton";

export const ApplyChangesPopup = ({
  disabled = false,
  onApply = () => {},
  onClearChanges = null,
  name= "Apply Changes"
}) => {
  if (disabled) return null;

  return (
    <>
    <AnimatePresence>
      <motion.div
        className={styles.popup}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <TextButton title={name} action={onApply} />
        {onClearChanges && (
          <button
            className={styles.clearButton}
            onClick={onClearChanges}
          >
            Clear Changes
          </button>
        )}
      </motion.div>
    </AnimatePresence>
    <div className={styles.heightPlaceHolder} />
    </>
  );
};
