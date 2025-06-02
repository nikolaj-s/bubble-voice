import { useEffect, useState } from "react";

export function useIsMobile(maxWidth = 730) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isMobile;
}
