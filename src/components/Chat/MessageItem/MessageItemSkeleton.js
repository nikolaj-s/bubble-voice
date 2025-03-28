import styles from "./MessageItem.module.css";

const MessageItemSkeleton = ({ hasImage = false }) => {
  return (
    <div className={styles.messageItem}>
      {/* User Image Skeleton */}
      <div className={styles.userImageWrapper}>
        <div className={`${styles.skeleton} ${styles.userImage}`} />

      </div>
     
      {/* Message Content Skeleton */}
      <div className={styles.messageContent}>
        <div className={`${styles.skeleton} ${styles.userName}`} />

        {/* Randomly vary between text blocks or an image skeleton */}
        {hasImage ? (
          <div className={`${styles.skeleton} ${styles.imageSkeleton}`} />
        ) : (
          <>
            <div className={`${styles.skeleton} ${styles.textBlock} ${styles.short}`} />
            <div className={`${styles.skeleton} ${styles.textBlock} ${styles.long}`} />
          </>
        )}
      </div>
    </div>
  );
};

export default MessageItemSkeleton;
