// components/Skeletons/SkeletonCardLoader.jsx
import React from "react";
import styles from "./SkeletonCards.module.css";

export const SkeletonCards = ({ count = 6 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className={styles.wrapper}>
      {skeletons.map((_, idx) => {
        const randomHeight = 150 + Math.floor(Math.random() * 100); // 150px to 250px random

        return (
          <div
            key={idx}
            className={styles.skeleton}
            style={{ height: `${randomHeight}px` }}
          />
        );
      })}
    </div>
  );
};
