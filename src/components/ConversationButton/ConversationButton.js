
import styles from './ConversationButton.module.css';
import { AlertIndicator } from '../ui/AlertIndicator/AlertIndicator';
import DateTimeDisplay from '../ui/DateTimeDisplay/DateTimeDisplay';

const ConversationButton = ({
  conversation,
  action,
  active,
  display_name,
  user_image,
  updatedAt,
  unread
}) => {
  const hasData = display_name && user_image;

  return (
    <button
      type="button"
      className={[
        styles.button,
        active ? styles.active : '',
        unread ? styles.unread : ''
      ].join(' ')}
      onClick={() => action(conversation)}
      data-context={JSON.stringify({ ...conversation, type: 'conversation' })}
    >
      <AlertIndicator active={Boolean(unread)} className={styles.alert} />

      <div className={styles.avatarWrapper}>
        {hasData ? (
          <img
            src={user_image}
            alt={`${display_name} avatar`}
            className={styles.avatar}
            loading="lazy"
          />
        ) : (
          <div className={styles.skeletonAvatar} />
        )}
      </div>

      {/* content */}
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.name} title={display_name || ''}>
            {display_name || 'Loading…'}
          </span>

          <span className={styles.time}>
            <DateTimeDisplay date={updatedAt} />
          </span>
        </div>

        <div className={styles.bottomRow}>
          {unread ? (
            <span className={styles.badge}>New</span>
          ) : (
            <span className={styles.subtle}>Read</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationButton;
