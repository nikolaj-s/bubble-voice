import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./MessageReactionsBar.module.css";

function groupReactionsMap(reactionsMap) {
  // reactionsMap: { [userId]: "👍" }
  const grouped = new Map(); // reaction -> { count, users: [] }

  if (!reactionsMap || typeof reactionsMap !== "object") return [];

  for (const [userId, reaction] of Object.entries(reactionsMap)) {
    if (!reaction) continue;

    const key = String(reaction).trim();
    if (!key) continue;

    const existing = grouped.get(key);
    if (existing) {
      existing.count += 1;
      existing.users.push(userId);
    } else {
      grouped.set(key, { reaction: key, count: 1, users: [userId] });
    }
  }

  // sort: highest count first, then emoji string
  return Array.from(grouped.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.reaction.localeCompare(b.reaction);
  });
}

export default function MessageReactionsBar({
  reactions,
  currentUserId,
  onToggle,
  className = "",
  maxVisible = 10,
}) {
  const groups = useMemo(() => groupReactionsMap(reactions), [reactions]);
  const visible = groups.slice(0, maxVisible);

  if (!visible.length) return null;

  return (
    <div className={`${styles.wrap} ${className}`} aria-label="Message reactions">
      {visible.map((g) => {
        const reactedByMe =
          currentUserId && Array.isArray(g.users)
            ? g.users.includes(String(currentUserId))
            : false;

        return (
          <button
            key={g.reaction}
            type="button"
            className={`${styles.pill} ${reactedByMe ? styles.mine : ""}`}
            onClick={() => onToggle?.(g.reaction)}
            title={reactedByMe ? "You reacted" : `${g.count} reaction${g.count === 1 ? "" : "s"}`}
          >
            <span className={styles.emoji} aria-hidden="true">
              {g.reaction}
            </span>
            <span className={styles.count}>{g.count}</span>
          </button>
        );
      })}

      {groups.length > maxVisible && (
        <div className={styles.more} title={`${groups.length - maxVisible} more`}>
          +{groups.length - maxVisible}
        </div>
      )}
    </div>
  );
}

MessageReactionsBar.propTypes = {
  reactions: PropTypes.object, // { [userId]: "👍" }
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onToggle: PropTypes.func, // (reaction) => void
  className: PropTypes.string,
  maxVisible: PropTypes.number,
};
