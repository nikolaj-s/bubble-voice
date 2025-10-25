import React, { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
// your portal helper
import styles from "./ConfirmationPopup.module.css";
import Portal from "../../../Portal/Portal";
import TextButton from "../../Buttons/TextButton/TextButton";

const spring = { type: "spring", stiffness: 380, damping: 30, mass: 0.7 };

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const popupVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
  exit: { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.16 } }
};

export default function ConfirmationPopup({
  open = true,
  message,
  onConfirm,
  onCancel,
  icon: Icon = AlertCircle,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
  closeOnOverlay = true,
}) {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => confirmBtnRef.current?.focus(), 0);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = original;
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel?.();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        }
      }
    },
    [onCancel]
  );

  const onOverlayClick = (e) => {
    if (!closeOnOverlay) return;
    if (e.target === e.currentTarget) onCancel?.();
  };

  const variantClass =
    variant === "danger"
      ? styles.variantDanger
      : variant === "success"
      ? styles.variantSuccess
      : styles.variantDefault;

  return (
    <AnimatePresence>
      {open && (
        <Portal id="bubble-portal">
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseDown={onOverlayClick}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              className={`${styles.popup} ${variantClass}`}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleKeyDown}
              ref={dialogRef}
            >
              <div className={styles.header}>
                <div className={styles.iconWrap}>
                  <Icon size={28} />
                </div>
                <h2 id="confirm-title" className={styles.title}>Are you sure?</h2>
              </div>

              <div className={styles.message}>{message}</div>

              <div className={styles.buttons}>
                <TextButton backgroundColor={'var(--error-color)'} title={cancelLabel} action={onCancel} />
                <TextButton title={confirmLabel} action={onConfirm} />
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
}
