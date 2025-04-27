// components/GalleryDisplay/GalleryDisplay.jsx
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
  if (!images.length) return <p className={styles.emptyText}>No images to display.</p>;

  return (
    <div className={styles.gallery}>
      {images.map((img, index) => (
        <div
          key={index}
          className={styles.imageWrapper}
        > 
        <ImageTooltipWrapper image={{src: img}}>
          <ImageComponent src={img} />
        </ImageTooltipWrapper>
          
        </div>
      ))}
    </div>
  );
};
