import styles from "./MessageItem.module.css";

const MessageItemSkeleton = ({ hasImage = false }) => {
  return (
    <div style={{flexDirection: 'row'}} className={styles.messageItem}>
      {/* User Image Skeleton */}
      <div className={styles.userImageWrapper}>
        <div className={`${styles.skeleton} ${styles.userImage}`} />

      </div>
     
      {/* Message Content Skeleton */}
      <div style={{width: 'calc(100% - 52px)'}} className={styles.messageContent}>
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
