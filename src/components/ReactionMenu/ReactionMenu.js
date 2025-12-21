import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import styles from "./ReactionMenu.module.css";

const normalize = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .filter(Boolean)
    .map((r) => String(r).trim())
    .filter((r) => r.length)
    .slice(0, 12); // keep it quick + lightweight

export default function ReactionMenu({
  reactions,
  action,
  onOpenPicker,
  maxVisible = 8,
  size = "md",
  autoFocus = true,
  className = "",
}) {
  const list = useMemo(() => normalize(reactions), [reactions]);
  const visible = useMemo(() => list.slice(0, maxVisible), [list, maxVisible]);

  const rootRef = useRef(null);
  const btnRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoFocus) return;
    // focus the first button so arrows work immediately when context menu opens
    const first = btnRefs.current?.[0];
    first?.focus?.();
  }, [autoFocus, visible.length]);

  useEffect(() => {
    // clamp active index if list shrinks
    setActiveIndex((i) => Math.max(0, Math.min(i, Math.max(0, visible.length - 1))));
  }, [visible.length]);

  const handleSelect = (reaction) => {
    if (typeof action === "function") action(reaction);
  };

  const handleKeyDown = (e) => {
    if (!visible.length) return;

    // allow parent context menu to also listen, but keep nav smooth
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (activeIndex + 1) % visible.length;
      setActiveIndex(next);
      btnRefs.current?.[next]?.focus?.();
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (activeIndex - 1 + visible.length) % visible.length;
      setActiveIndex(prev);
      btnRefs.current?.[prev]?.focus?.();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(visible[activeIndex]);
      return;
    }

    // let the parent context menu close on Esc; we just avoid doing anything weird here
    if (e.key === "Escape") return;
  };

  if (!visible.length && !onOpenPicker) return null;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles[size]} ${className}`}
      role="toolbar"
      aria-label="Quick reactions"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.strip}>
        {visible.map((r, idx) => (
          <button
            key={`${r}-${idx}`}
            ref={(el) => (btnRefs.current[idx] = el)}
            type="button"
            className={styles.reactionBtn}
            onClick={() => handleSelect(r)}
            onMouseEnter={() => setActiveIndex(idx)}
            aria-label={`React ${r}`}
          >
            <span className={styles.emoji} aria-hidden="true">
              {r}
            </span>
          </button>
        ))}

        {typeof onOpenPicker === "function" && (
          <button
            type="button"
            className={styles.plusBtn}
            onClick={onOpenPicker}
            aria-label="Open reaction picker"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

ReactionMenu.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.func.isRequired,
  onOpenPicker: PropTypes.func,
  maxVisible: PropTypes.number,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
};
