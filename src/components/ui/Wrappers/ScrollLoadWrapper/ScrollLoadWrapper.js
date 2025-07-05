import React, { useRef, useCallback } from "react";
import styles from "./ScrollLoadWrapper.module.css";

const ScrollLoadWrapper = ({
  children,
  loadMore,           // Function to fetch/load more items
  loading,             // Boolean, whether data is loading
  noMoreItems,         // Boolean, disables loadMore
  className = "",      // Optional, custom classes
  style,               // Optional, custom styles
  threshold = 80,
  maxContentWidth = 1000     // px distance from bottom to trigger loadMore
}) => {
  const containerRef = useRef();

  const handleScroll = useCallback(() => {
    if (loading || noMoreItems) return;
    const el = containerRef.current;
    if (!el) return;

    if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
      loadMore?.();
    }
  }, [loading, noMoreItems, loadMore, threshold]);

  return (
    <div
      className={`${styles.scrollContainer} ${className}`}
      style={style}
      ref={containerRef}
      onScroll={handleScroll}
      tabIndex={0}
    > 
      <div style={{maxWidth: maxContentWidth}} className={styles.content}>
        {children}
      </div>
      <div className={styles.bottomBar}>
        {loading && (
          <div className={styles.loader}>
            <span className={styles.spinner}></span> Loading...
          </div>
        )}
        {noMoreItems && (
          <div className={styles.endMsg}>No more items</div>
        )}
      </div>
    </div>
  );
};

export default ScrollLoadWrapper;
