import React from "react";
import styles from "./NoBubbleResults.module.css";
import { motion } from "framer-motion";
import TextButton from "../../ui/Buttons/TextButton/TextButton";

export const NoBubbleResults = ({ onCreateBubble, message }) => {
  return (
    <div className={styles.container}>
      <motion.h2 
        className={styles.message}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your next bubble is just a search away!
      </motion.h2>
      
      <motion.p 
        className={styles.subtext}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore new bubbles to connect with like-minded people!
      </motion.p>
      
      <TextButton action={onCreateBubble} title="Create Your Own Bubble" />

      {/* Floating Bubbles */}
      <div className={styles.bubbles}>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.bubble}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -100, opacity: 1 }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
            style={{ left: `${Math.random() * 100}%`, animationDuration: `${3 + Math.random() * 3}s` }}
          />
        ))}
      </div>
    </div>
  );
};

