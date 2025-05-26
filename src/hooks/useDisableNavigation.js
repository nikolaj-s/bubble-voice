import { useEffect } from "react";

export const useDisableNavigation = () => {
  useEffect(() => {
    const blockNavigation = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      // Push current URL again to override history pop
      window.history.pushState(null, "", window.location.href);
    };

    // Push a new history entry to block back
    window.history.pushState(null, "", window.location.href);

    // Listen for back/forward events
    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, []);
};
