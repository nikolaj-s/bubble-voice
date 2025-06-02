import styles from "./ContentHeader.module.css";

const ContentHeader = ({Icon, title, subTitle}) => (
  <div className={styles.header}>
    <div className={styles.iconWrap}>
      {Icon && (<Icon size={38} strokeWidth={2.2} className={styles.icon} />)}
    </div>
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>
       {subTitle}
      </p>
    </div>
    <div className={styles.bubbles}>
      <span className={`${styles.bubble} ${styles.bubble1}`}></span>
      <span className={`${styles.bubble} ${styles.bubble2}`}></span>
      <span className={`${styles.bubble} ${styles.bubble3}`}></span>
      <span className={`${styles.bubble} ${styles.bubble4}`}></span>
    </div>
  </div>
);

export default ContentHeader;