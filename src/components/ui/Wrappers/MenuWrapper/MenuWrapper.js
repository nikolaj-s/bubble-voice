import React, { act } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MenuWrapper.module.css";
import IconButton from "../../Buttons/IconButton/IconButton";
import { Menu, X } from "lucide-react";
import MicroFooter from "../../../MicroFooter/MicroFooter";

const MenuWrapper = ({ navItems, children, permissions, showFooter, }) => {

  const [mobileMenuOpen, toggleMobileMenuOpen] = React.useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSection = children[searchParams.get("section")] ? searchParams.get("section") : navItems[0].key;

  const handleNavClick = (key) => {

    toggleMobileMenuOpen(false);

    setSearchParams({ section: key });

  };

  return (
    <div className={`${styles.cardWrapper} ${mobileMenuOpen ? styles.menuOpen : ''}`}>
      {/* Sidebar Navigation */}
      <div className={`${styles.sidebar} `}>
        <IconButton 
        className={styles.mobileMenuButton}
        Icon={mobileMenuOpen ? <X color="var(--text-color)" /> : <Menu color="var(--text-color)" />}
        onClick={() => {toggleMobileMenuOpen(!mobileMenuOpen)}}
        />
        {navItems.map((item) => (
          <motion.button
            key={item.key}
            onClick={() => handleNavClick(item.key)}
            className={`${styles.navButton} ${
              activeSection === item.key ? styles.activeNavButton : ""
            }`}
          >
            {item.label}
          </motion.button>
        ))}
        {showFooter && (<MicroFooter />)}
      </div>

      {/* Right Content Area with Animation */}
      <div onClick={() => {toggleMobileMenuOpen(false)}} className={styles.contentArea}>
       <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.contentWrapper}
          >
             {React.cloneElement(children[activeSection], { permissions })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuWrapper;
