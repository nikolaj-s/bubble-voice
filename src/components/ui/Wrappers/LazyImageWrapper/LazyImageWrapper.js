import React, { useEffect, useRef, useState } from "react";

const LazyImageWrapper = ({
  children,
  className = "",
  width = "100%",
  height = "auto",
  aspectRatio = null,
  unmountDelay = 1000,
  rootMargin = "350px 0px 350px 0px" // top, right, bottom, left
}) => {
  const containerRef = useRef();
  const timeoutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timeoutRef.current);
          setIsVisible(true);
        } 
      },
      {
        threshold: 0,
        rootMargin, // This gives a buffer of 300px around viewport
      }
    );

    const node = containerRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      clearTimeout(timeoutRef.current);
    };
  }, [unmountDelay, rootMargin]);

  const style = {
    width,
    height,
    aspectRatio: aspectRatio || undefined,
  };

  return (
    <div ref={containerRef} className={className} style={style}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyImageWrapper;
