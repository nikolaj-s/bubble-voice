import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DropDown.module.css";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ selected, options, setSelected, selector = "label" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selected ? getLabel(selected) : "Select an option"}
        <ChevronDown />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.options}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {options.map((option) => (
              <motion.li
                key={typeof option === "string" ? option : option._id}
                className={`${styles.option} ${
                  selected && getLabel(selected) === getLabel(option) ? styles.selectedOption : ""
                }`}
                onClick={() => handleSelect(option)}
                transition={{ type: "spring", stiffness: 300 }}
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


