import React, { useRef, useCallback, useState, useEffect } from "react";
import styles from "./ScrollLoadWrapper.module.css";

const ScrollLoadWrapper = ({
  children,
  loadMore,
  loading,
  noMoreItems,
  className = "",
  style,
  threshold = 80,
  maxContentWidth = 1000,
  contentGap,
  context = {}
}) => {
  const [hover, toggleHover] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const containerRef = useRef();
  const scrollTimeoutRef = useRef();

  const handleScroll = useCallback(() => {
    if (loading || noMoreItems) return;
    const el = containerRef.current;
    if (!el) return;

    // mark as scrolling
    setScrolling(true);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setScrolling(false), 250);

    if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
      loadMore?.();
    }
  }, [loading, noMoreItems, loadMore, threshold]);

  useEffect(() => {
    return () => clearTimeout(scrollTimeoutRef.current);
  }, []);

  return (
    <div
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      onTouchStart={() => toggleHover(true)}
      onTouchEnd={() => toggleHover(false)}
      className={`${styles.scrollContainer} ${className}`}
      style={{ ...style, overflow: null }}
      ref={containerRef}
      onScroll={handleScroll}
      tabIndex={0}
      data-context={JSON.stringify(context)}
    >
      <div
        style={{
          maxWidth: maxContentWidth,
          gap: contentGap,
          pointerEvents: scrolling ? "none" : "auto",
          transition: "pointer-events 0.2s ease"
        }}
        className={styles.content}
      >
        {children}
      </div>

      <div className={styles.bottomBar}>
        {loading && (
          <div className={styles.loader}>
            <span className={styles.spinner}></span> Loading...
          </div>
        )}
        {noMoreItems && <div className={styles.endMsg}>No more items</div>}
      </div>
    </div>
  );
};

export default ScrollLoadWrapper;
