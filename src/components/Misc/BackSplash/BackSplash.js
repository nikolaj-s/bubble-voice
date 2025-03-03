import { useEffect, useState } from "react";
import styles from "./BackSplash.module.css";
import { Logo } from "../../../Icons/Bubble/Logo";

const BackSplash = ({ children }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const createBubbles = () => {
      const bubbleCount = 20; // Number of bubbles to create
      const bubbleArray = [];
      for (let i = 0; i < bubbleCount; i++) {
        bubbleArray.push({
          id: i,
          size: Math.random() * 40 + 20, // Random bubble size between 20px and 60px
          left: Math.random() * 100, // Random position along the x-axis
          animationDuration: Math.random() * 5 + 5 + "s", // Random animation duration between 5s and 10s
          animationDelay: Math.random() * 5 + "s", // Random delay before animation starts
        });
      }
      setBubbles(bubbleArray);
    };

    createBubbles(); // Generate bubbles when component mounts
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles['logo-wrapper']}>
        <Logo width={100} height={100} />
      </div>
      <div className={styles.splashContainer}>
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={styles.bubble}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDuration: bubble.animationDuration,
              animationDelay: bubble.animationDelay,
            }}
          />
        ))}
      </div>
      <div className={styles.content}>
        {children} {/* This will render the wrapped component */}
      </div>
    </div>
  );
};

export default BackSplash;
