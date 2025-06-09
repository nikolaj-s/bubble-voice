import { useEffect } from "react";

/**
 * Prevents global play/pause keys (spacebar, media keys) from controlling media.
 * Only allows these keys when an input or textarea is focused.
 */
export const useBlockGlobalPlayPauseKeys = () => {
  useEffect(() => {
    const handler = (e) => {
      if (
        e.code === "Space" ||
        e.key === " " ||
        e.key === "Spacebar" ||
        e.code === "MediaPlayPause"
      ) {
        const active = document.activeElement;
        if (
          !active ||
          !["INPUT", "TEXTAREA"].includes(active.tagName)
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    window.addEventListener("keydown", handler, true); // capture phase
    return () => window.removeEventListener("keydown", handler, true);
  }, []);
};
