import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";
import IconButton from "../IconButton/IconButton";

export default function BackButton({
  label = "Back",
  className = "",
  fallback = "/",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    // If history exists, go back — otherwise fallback
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <IconButton
    Icon={ChevronLeft}
    title={'Back'}
    onClick={handleBack}
    />
  );
}
