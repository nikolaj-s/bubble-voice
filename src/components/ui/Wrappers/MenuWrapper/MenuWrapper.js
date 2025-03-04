import React from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MenuWrapper.module.css";

const MenuWrapper = ({ navItems, children }) => {
  
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSection = searchParams.get("section") || navItems[0].key;

  const handleNavClick = (key) => {
    setSearchParams({ section: key });
  };

  return (
    <div className={styles.cardWrapper}>
      {/* Sidebar Navigation */}
      <div className={styles.sidebar}>
        {navItems.map((item) => (
          <motion.button
            key={item.key}
            onClick={() => handleNavClick(item.key)}
            className={`${styles.navButton} ${
              activeSection === item.key ? styles.activeNavButton : ""
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Right Content Area with Animation */}
      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children[activeSection]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuWrapper;
