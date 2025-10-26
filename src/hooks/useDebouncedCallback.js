import React from "react";

// Stable debounce helper
export function useDebouncedCallback(fn, delay = 120) {
  const fnRef = React.useRef(fn);
  const timerRef = React.useRef();

  React.useEffect(() => { fnRef.current = fn; }, [fn]);

  const debounced = React.useCallback((...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fnRef.current(...args), delay);
  }, [delay]);

  const cancel = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return React.useMemo(() => ({ call: debounced, cancel }), [debounced, cancel]);
}