// Dropdown.jsx (hardened + safe fallbacks)
import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./DropDown.module.css";

const Dropdown = ({
  selected = null,
  options = [],
  setSelected = () => {},
  selector = "label",
  minWidth = "120px",
  placeholder = "Select...",
  emptyLabel = "No options",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0 });
  const [menuStyle, setMenuStyle] = useState({});
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const safeOptions = useMemo(() => (Array.isArray(options) ? options : []), [options]);
  const hasOptions = safeOptions.length > 0;

  const getLabel = (opt) => {
    if (opt == null) return "";
    if (typeof opt === "string" || typeof opt === "number") return String(opt);
    if (typeof opt === "object") {
      const v = opt?.[selector];
      if (v == null) return "";
      return typeof v === "string" || typeof v === "number" ? String(v) : "";
    }
    return "";
  };

  const selectedLabel = useMemo(() => {
    const label = getLabel(selected);
    return label || "";
  }, [selected, selector]);

  const toggle = () => {
    if (disabled || !hasOptions) return;

    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setAnchor({ x: rect.left, y: rect.bottom, width: rect.width });
    }
    setIsOpen((o) => !o);
  };

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e) => {
      const t = e.target;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(t) &&
        menuRef.current &&
        !menuRef.current.contains(t)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // If options disappear while open, close
  useEffect(() => {
    if (isOpen && !hasOptions) setIsOpen(false);
  }, [isOpen, hasOptions]);

  // Position & clamp the portal menu
  useLayoutEffect(() => {
    if (!isOpen) return;

    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Seed below the button
    {
      let left = anchor.x;
      const btnW = anchor.width || dropdownRef.current?.getBoundingClientRect()?.width || 0;

      if (left + btnW > vw - margin) {
        left = Math.max(margin, vw - btnW - margin);
      }

      setMenuStyle({
        position: "fixed",
        top: `${anchor.y + margin}px`,
        left: `${left}px`,
        minWidth: `${Math.max(btnW, 120)}px`,
        maxHeight: `${vh - margin * 2}px`,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 9999,
      });
    }

    // Refine after it renders
    requestAnimationFrame(() => {
      if (!menuRef.current || !dropdownRef.current) return;

      const btnRect = dropdownRef.current.getBoundingClientRect();
      const menuH = menuRef.current.scrollHeight;
      const menuW = menuRef.current.offsetWidth;

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
      if (left2 + menuW > vw - margin) {
        left2 = Math.max(margin, vw - menuW - margin);
      }

      setMenuStyle((ms) => ({
        ...ms,
        top: `${top}px`,
        left: `${left2}px`,
        maxHeight: `${Math.min(menuH, vh - margin * 2)}px`,
        overflowY: vh - margin * 2 < menuH ? "auto" : "visible",
      }));
    });
  }, [isOpen, anchor]);

  const onSelect = (opt) => {
    try {
      setSelected?.(opt);
    } finally {
      setIsOpen(false);
    }
  };

  const menu = isOpen
    ? createPortal(
        <AnimatePresence>
          <motion.ul
            ref={menuRef}
            className={styles.options}
            style={menuStyle}
            role="listbox"
            aria-label="Dropdown options"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.16 }}
          >
            {hasOptions ? (
              safeOptions.map((opt, i) => {
                const label = getLabel(opt) || `Option ${i + 1}`;
                const isSelected = selectedLabel && label === selectedLabel;

                return (
                  <motion.li
                    key={`${label}-${i}`}
                    className={`${styles.option} ${isSelected ? styles.selectedOption : ""}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => onSelect(opt)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {label}
                  </motion.li>
                );
              })
            ) : (
              <li className={`${styles.option} ${styles.optionDisabled}`} aria-disabled="true">
                {emptyLabel}
              </li>
            )}
          </motion.ul>
        </AnimatePresence>,
        document.body
      )
    : null;

  const buttonLabel = selectedLabel || (hasOptions ? placeholder : emptyLabel);
  const isButtonDisabled = disabled || !hasOptions;

  return (
    <div className={styles.dropdown} ref={dropdownRef} style={{ minWidth }}>
      <button
        type="button"
        className={`${styles.dropdownButton} ${isButtonDisabled ? styles.dropdownButtonDisabled : ""}`}
        onClick={toggle}
        style={{ minWidth }}
        disabled={isButtonDisabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.buttonText} title={buttonLabel}>
          {buttonLabel}
        </span>

        <ChevronDown
          size={16}
          style={{
            rotate: isOpen ? "-180deg" : "0deg",
            transition: "0.2s",
            opacity: isButtonDisabled ? 0.5 : 1,
          }}
          color="var(--text-color)"
        />
      </button>

      {menu}
    </div>
  );
};



export default Dropdown;
