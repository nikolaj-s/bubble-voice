import { useEffect } from "react";

export const useDisableNavigation = () => {
  useEffect(() => {
    const blockNavigation = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      // Push current URL again to override history pop
      window.history.pushState(null, "", window.location.href);
    };

    const blockMouseBackForward = (event) => {
      // Only block back (3) and forward (4) buttons
      if (event.button === 3 || event.button === 4) {
        event.preventDefault();
      //  event.stopImmediatePropagation();
      }
    };

    // Push a new history entry to block back
    window.history.pushState(null, "", window.location.href);

    // Listen for back/forward events
    window.addEventListener("popstate", blockNavigation);

    // Listen for mouse back/forward buttons
    window.addEventListener("mousedown", blockMouseBackForward);
    window.addEventListener("mouseup", blockMouseBackForward);
    window.addEventListener("auxclick", blockMouseBackForward);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
      window.removeEventListener("mousedown", blockMouseBackForward);
      window.removeEventListener("auxclick", blockMouseBackForward);
      window.removeEventListener("mouseup", blockMouseBackForward)
    };
  }, []);
};
