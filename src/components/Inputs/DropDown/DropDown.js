import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DropDown.module.css';

const Dropdown = ({ selected, options, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selected || 'Select an option'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.options}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {options.map((option, index) => (
              <motion.li
                key={index}
                className={`${styles.option} ${option === selected ? styles.selectedOption : ''}`}
                onClick={() => handleSelect(option)}
               
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
