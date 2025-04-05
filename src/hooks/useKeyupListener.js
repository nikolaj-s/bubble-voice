import { useEffect } from "react";

const useKeyupListener = (action, key, useCtrl) => {
  useEffect(() => {
    const handleKeyUp = (event) => {

      if (event.keyCode === key && event.ctrlKey === useCtrl) {
        action();
      }
      
    };

    // Add event listener for 'keyup' event
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [action, key, useCtrl]); // Dependency array to ensure cleanup and proper re-execution
};

export default useKeyupListener;
