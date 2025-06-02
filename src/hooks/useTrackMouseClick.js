import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClickPosition } from "../features/MousePosition/mousePositionSlice"; // Adjust import path as needed

export const useTrackMouseClick = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (e) => {
      dispatch(setClickPosition({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [dispatch]);
};
