// Dropdown.jsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./DropDown.module.css";

const Dropdown = ({
  selected,
  options,
  setSelected,
  selector = "label",
  minWidth = "120px",
}) => {
  const [isOpen, setIsOpen]     = useState(false);
  const [anchor, setAnchor]     = useState({ x: 0, y: 0, width: 0 });
  const [menuStyle, setMenuStyle] = useState({});
  const dropdownRef = useRef(null);
  const menuRef     = useRef(null);

  const getLabel = (opt) =>
    typeof opt === "string" ? opt : opt[selector];

  // Toggle open/close & capture the button's rect on open
  const toggle = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setAnchor({ x: rect.left, y: rect.bottom, width: rect.width });
    }
    setIsOpen((o) => !o);
  };

  // ——— FIXED outside‐click logic ———
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);
  // ————————————————————————————

  // Position & clamp the portal menu
  useLayoutEffect(() => {
    if (!isOpen) return;
    const margin = 8;
    const vw     = window.innerWidth;
    const vh     = window.innerHeight;

    // 1) Seed it under the button instantly
    {
      let left = anchor.x;
      const btnW = anchor.width;
      if (left + btnW > vw - margin) {
        left = vw - btnW - margin;
      }
      setMenuStyle({
        position:  "fixed",
        top:       `${anchor.y + margin}px`,
        left:      `${left}px`,
        minWidth:  `${btnW}px`,
        maxHeight: `${vh - margin * 2}px`,
        overflowY: "auto",
        overflowX: "hidden",
      });
    }

    // 2) Refine after it renders
    requestAnimationFrame(() => {
      if (!menuRef.current || !dropdownRef.current) return;
      const btnRect    = dropdownRef.current.getBoundingClientRect();
      const menuH      = menuRef.current.scrollHeight;
      const menuW      = menuRef.current.offsetWidth;
      const spaceBelow = vh - btnRect.bottom;
      const spaceAbove = btnRect.top;

      let top;
      if (spaceBelow >= menuH + margin) {
        top = btnRect.bottom + margin;
      } else if (spaceAbove >= menuH + margin) {
        top = btnRect.top - menuH - margin;
      } else if (spaceBelow >= spaceAbove) {
        top = btnRect.bottom + margin;
      } else {
        top = Math.max(margin, btnRect.top - menuH - margin);
      }

      let left2 = btnRect.left;
      if (btnRect.left + menuW > vw - margin) {
        left2 = vw - menuW - margin;
      }

      setMenuStyle((ms) => ({
        ...ms,
        top:       `${top}px`,
        left:      `${left2}px`,
        maxHeight: `${Math.min(menuH, vh - margin * 2)}px`,
        overflowY:
          vh - margin * 2 < menuH ? "auto" : "visible",
      }));
    });
  }, [isOpen, anchor]);

  // Portal’d menu
  const menu = isOpen
    ? createPortal(
        <AnimatePresence>
          <motion.ul
            ref={menuRef}
            className={styles.options}
            style={menuStyle}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt, i) => (
              <motion.li
                key={i}
                className={`${styles.option} ${
                  selected && getLabel(selected) === getLabel(opt)
                    ? styles.selectedOption
                    : ""
                }`}
                onClick={() => {
                  setSelected(opt);
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {getLabel(opt)}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}
      style={{ minWidth }}
    >
      <button
        className={styles.dropdownButton}
        onClick={toggle}
        style={{ minWidth }}
      >
        {selected ? getLabel(selected) : "Select..."}
        <ChevronDown
          size={16}
          style={{
            rotate: isOpen ? "-180deg" : "0deg",
            transition: "0.2s",
          }}
          color="var(--text-color)"
        />
      </button>
      {menu}
    </div>
  );
};

export default Dropdown;
