import { useEffect, useRef, useState } from "react";
import { getEdgeAverageColor } from "../lib/services/getEdgeAverageColor";

export function useVideoElementAverageColor(videoElementId, isDisabled = false, intervalMs = 2000) {
  const [color, setColor] = useState("#000000");
  const timerRef = useRef();

  useEffect(() => {
    if (!videoElementId || isDisabled) {
      setColor("#000000");
      return;
    }

    let didError = false;
    const size = 16;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", {willReadFrequently: true});
    
    const grabColor = () => {
      const video = document.getElementById(videoElementId);
      if (
        !video ||
        video.tagName !== "VIDEO" ||
        !video.videoWidth ||
        !video.videoHeight
      ) {
        setColor("#000000");
        return;
      }
      try {
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(video, 0, 0, size, size);
        setColor(getEdgeAverageColor(ctx, size, size));
      } catch {
        setColor("#000000");
        didError = true;
      }
    };

    grabColor();
    timerRef.current = setInterval(grabColor, intervalMs);

    const fallbackTimeout = setTimeout(() => {
      if (didError) setColor("#000000");
    }, 3000);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(fallbackTimeout);
      setColor("#000000");
    };
  }, [videoElementId, isDisabled, intervalMs]);

  return color;
}
