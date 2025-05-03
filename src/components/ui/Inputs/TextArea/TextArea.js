import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./TextArea.module.css";

const TextArea = ({ limit = 200, placeholder = "Type something...", text = "", setText = () => {}}) => {

  const handleChange = (e) => {
    e.stopPropagation();

    if (e.target.value.length <= limit) {
      setText(e.target.value);
    }
  };

  const getCounterColor = () => {
    if (text.length === limit) return styles.error;
    if (text.length > limit * 0.8) return styles.warning;
    return styles.counter;
  };

  return (
    <motion.div
      className={styles.textareaContainer}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        className={styles.textarea}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyUp={(e) => {e.stopPropagation()}}
        onKeyDown={(e) => {e.stopPropagation()}}
      />
      <motion.span
        className={`${styles.counter} ${getCounterColor()}`}
        animate={{ scale: text.length >= limit * 0.8 ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {text.length} / {limit}
      </motion.span>
    </motion.div>
  );
};

export default TextArea;
