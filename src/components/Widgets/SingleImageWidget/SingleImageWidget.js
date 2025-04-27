// components/Widgets/SingleImageWidget/SingleImageWidget.jsx
import React from "react";
import styles from "./SingleImageWidget.module.css";
import { ImageOff } from "lucide-react";
import { ImageTooltipWrapper } from "../../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper";
import { ImageComponent } from "../../ui/Image/Image";

export const SingleImageWidget = ({ image, alt = "Widget Image" }) => {
  if (!image) {
    return (
      <div className={styles.placeholder}>
        <ImageOff size={36} />
        <p>No image provided.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ImageTooltipWrapper image={{src: image, type: 'image'}}>
        <ImageComponent src={image} />
      </ImageTooltipWrapper>
    </div>
  );
};
