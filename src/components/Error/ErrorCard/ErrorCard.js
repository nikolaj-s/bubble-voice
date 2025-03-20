import React from "react";
import { motion } from "framer-motion";
import styles from "./ErrorCard.module.css";
import { ShieldX } from "lucide-react";

const ErrorCard = ({ message }) => {
  return (
    <motion.div 
      className={styles.errorCard}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.3 }}
    >
        <ShieldX color="var(--text-color)" width={200} height={200} />
      <p className={styles.errorMessage}>{message}</p>
    </motion.div>
  );
};

export default ErrorCard;
