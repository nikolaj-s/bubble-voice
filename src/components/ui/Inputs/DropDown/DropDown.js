import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DropDown.module.css";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ selected, options, setSelected, selector = "label", minWidth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [menuStyle, setMenuStyle] = useState({});

  const [position, setPosition] = useState(null);

  const dropdownRef = useRef(null);
  
  const menuRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Extract label from either strings or objects
  const getLabel = (option) => (typeof option === "string" ? option : option[selector]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {

        setIsOpen(false);

      }
      
    };

    if (isOpen) {

      document.addEventListener("mousedown", handleClickOutside);

    } else {

      document.removeEventListener("mousedown", handleClickOutside);

    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (isOpen && dropdownRef.current && menuRef.current) {
        const triggerRect = dropdownRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
    
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
    
        const desiredHeight = menuRef.current.scrollHeight;
        const menuRect = menuRef.current.getBoundingClientRect();

        const overflowsRight = triggerRect.left + menuRect.width > window.innerWidth;
        const overflowsBottom = triggerRect.bottom + menuRect.height > window.innerHeight;

        if (overflowsRight && overflowsBottom) {
          setPosition("top-right");
        } else if (overflowsRight) {
          setPosition("bottom-right");
        } else if (overflowsBottom) {
          setPosition("top-left");
        } else {
          setPosition("bottom-left");
        }
    
        if (spaceBelow >= desiredHeight) {
          // Enough space below
          setMenuStyle({
            top: "100%",
            maxHeight: desiredHeight,
            overflowY: "visible",
            marginTop: "8px",
          });
        } else if (spaceAbove >= desiredHeight) {
          // Enough space above
          setMenuStyle({
            bottom: "100%",
            maxHeight: desiredHeight,
            overflowY: "visible",
            marginBottom: "8px",
          });
        } else if (spaceBelow >= spaceAbove) {
          // Not enough space, but use what we have below
          setMenuStyle({
            top: "100%",
            maxHeight: spaceBelow - 15,
            overflowY: "auto",
            marginTop: "8px",
          });
        } else {
          // Use the space above
          setMenuStyle({
            bottom: "100%",
            maxHeight: spaceAbove - 15,
            overflowY: "auto",
            marginBottom: "8px",
          });
        }
      }
    })
      
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef} style={{minWidth}}>
      <button className={styles.dropdownButton} onClick={toggleDropdown} style={{minWidth}}>
        {selected ? getLabel(selected) : "Select an option"}
        <ChevronDown 
        style={{rotate: isOpen ? '-180deg' : '0deg', transition: '0.2s'}}
        color="var(--text-color)" 
        size={15}
         />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            style={menuStyle}
            ref={menuRef}
            className={`${styles.options} ${styles[position]}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {options.map((option, indx) => (
              <motion.li
                key={indx}
                className={`${styles.option} ${
                  selected && getLabel(selected) === getLabel(option) ? styles.selectedOption : ""
                }`}
                onClick={() => handleSelect(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {getLabel(option)}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;


