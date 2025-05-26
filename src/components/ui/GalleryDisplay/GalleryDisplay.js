import React from "react";
import styles from "./GalleryDisplay.module.css";
import { ImageComponent } from "../Image/Image";
import { ImageTooltipWrapper } from "../Wrappers/ImageTooltipWrapper/ImageTooltipWrapper";

export const GalleryDisplay = ({
  images = [],
  width = 200,
  height = 200,
  objectFit = "cover"
}) => {
  const MAX_IMAGES = 9;
  const paddedImages = [...images.slice(0, MAX_IMAGES)];

  // Add empty placeholders if less than 9
  while (paddedImages.length < MAX_IMAGES) {
    paddedImages.push(null);
  }

  return (
    <div className={styles.gallery}>
      {paddedImages.map((img, index) => (
        <div key={index} className={styles.imageWrapper}>
          {img ? (
            <ImageTooltipWrapper image={{ src: img }}>
              <ImageComponent src={img} />
            </ImageTooltipWrapper>
          ) : null}
        </div>
      ))}
    </div>
  );
};
