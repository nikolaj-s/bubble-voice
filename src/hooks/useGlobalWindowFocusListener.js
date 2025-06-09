import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFocused } from "../features/Ui/uiSlice";

export const useGlobalWindowFocusListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const handleFocus = () => dispatch(setFocused(true));
    // const handleBlur  = () => dispatch(setFocused(false));
    // const handleVisibility = () =>
    //   dispatch(setFocused(document.visibilityState === "visible"));

    // window.addEventListener("focus", handleFocus);
    // window.addEventListener("blur", handleBlur);
    // document.addEventListener("visibilitychange", handleVisibility);

    // // set initial value
    // dispatch(setFocused(document.hasFocus()));

    // return () => {
    //   window.removeEventListener("focus", handleFocus);
    //   window.removeEventListener("blur", handleBlur);
    //   document.removeEventListener("visibilitychange", handleVisibility);
    // };
  }, [dispatch]);
};
