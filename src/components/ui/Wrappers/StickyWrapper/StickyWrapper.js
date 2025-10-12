import React, { useRef, useState, useEffect } from "react";
import styles from "./StickyWrapper.module.css";

// Utility to find the nearest scrollable parent
function getScrollParent(node) {
  if (!node) return null;
  if (node.scrollHeight > node.clientHeight) return node;
  return getScrollParent(node.parentNode);
}

const StickyWrapper = ({
  children,
  stickyOffset = 0,
  bgColor = "var(--card-background-color)",
  className = "",
  style = {},
  ...rest
}) => {
  const wrapperRef = useRef();
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    let scrollParent = getScrollParent(wrapper?.parentNode);
    if (!scrollParent) scrollParent = window;

    const handleScroll = () => {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
   
      // Compare wrapper's top to parent top plus offset
      setIsStuck(rect.top <= stickyOffset);
    };

    scrollParent.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => scrollParent.removeEventListener("scroll", handleScroll);
  }, [stickyOffset]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.sticky} ${isStuck ? styles.stuck : ""} ${className}`}
      style={{
        "--sticky-bg": bgColor,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default StickyWrapper;
