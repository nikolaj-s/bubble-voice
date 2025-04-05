import styles from "./CreateBubbleSplash.module.css";

const CreateBubbleSplash = () => {
  return (
    <div className={styles.splashContainer}>
      <div className={styles.bannerContent}>
        <h1 className={styles.title}>Create Your Bubble</h1>
        <p className={styles.subtitle}>Start a new community and have fun!</p>
     </div>
      <div className={styles.bubbles}>
        <div className={`${styles.bubble} ${styles.bubble1}`} />
        <div className={`${styles.bubble} ${styles.bubble2}`} />
        <div className={`${styles.bubble} ${styles.bubble3}`} />
        <div className={`${styles.bubble} ${styles.bubble4}`} />
        <div className={`${styles.bubble} ${styles.bubble5}`} />
      </div>
    </div>
  );
};

export default CreateBubbleSplash;
