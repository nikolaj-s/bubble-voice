import React, {
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback
} from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./VolumeSlider.module.css";

const VolumeSlider = ({
  value,
  onChange,
  step = 0.01,
  max = 1,
  min = 0,
  label,
  width,
  maxWidth,
  className
}) => {
  const percent = (value - min) / (max - min);
  const wrapperRef = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [showLabel, setShowLabel] = useState(false);

  // Create a div to portal the label into
  const portalEl = useMemo(() => document.createElement("div"), []);

  // Ensure there's a #tool-tip-parent in the DOM and append our portalEl
  useEffect(() => {
    let parentEl = document.getElementById("tool-tip-parent");
    if (!parentEl) {
      parentEl = document.createElement("div");
      parentEl.id = "tool-tip-parent";
      document.body.appendChild(parentEl);
    }
    parentEl.appendChild(portalEl);
    return () => {
      parentEl.removeChild(portalEl);
    };
  }, [portalEl]);

  // Measure slider thumb position whenever percent, width or maxWidth changes
  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const thumbX = rect.left + percent * rect.width;
    setPos({ left: thumbX, top: rect.top - 24 });
  }, [percent, width, maxWidth, showLabel]);

  // Handlers to show/hide the label on interaction
  const handlePointerDown = useCallback(() => setShowLabel(true), []);
  const handlePointerUp   = useCallback(() => setShowLabel(false), []);
  const handleMouseEnter  = useCallback(() => setShowLabel(true), []);
  const handleMouseLeave  = useCallback(() => setShowLabel(false), []);
  const handleFocus       = useCallback(() => setShowLabel(true), []);
  const handleBlur        = useCallback(() => setShowLabel(false), []);

  return (
    <>
      <div
        data-nodrag
        className={`${styles.volumeSlider} ${className || ""}`}
        style={{ "--slider-percent": percent, width, maxWidth }}
        ref={wrapperRef}
      >
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}

            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}

            className={styles.slider}
          />
        </div>
      </div>

      {label !== undefined &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {showLabel && (
              <motion.div
                className={styles.volumeLabel}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0}}
              >
                {Math.floor(label)}%
              </motion.div>
            )}
          </AnimatePresence>,
          portalEl
        )}
    </>
  );
};

export default VolumeSlider;
