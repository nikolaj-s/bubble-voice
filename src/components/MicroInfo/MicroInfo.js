import React from "react";
import { Link } from "react-router-dom";
import styles from "./MicroInfo.module.css";

/**
 * Props:
 * - createdBy: { displayName: string, avatarUrl?: string }
 * - serverId: string
 * - channelId: string
 * - channelName: string
 * - messageId?: string
 * - className?: string
 * - linkBuilder?: ({ serverId, channelId, messageId }) => string
 *   (default: `/server/${serverId}/channel/${channelId}${messageId ? '?message=' + messageId : ''}`)
 * - onChannelClick?: (event) => void   (optional override)
 */
export default function MicroInfo({
  createdBy,
  serverId,
  channelId,
  channelName,
  messageId,
  className = "",
  linkBuilder,
  onChannelClick
}) {
  const to =
    typeof linkBuilder === "function"
      ? linkBuilder({ serverId, channelId, messageId })
      : `/dashboard/server/${serverId}/channel/${channelId}${messageId ? `?message=${messageId}` : ""}`;

  const name = createdBy?.display_name || "Unknown";
  const avatar = createdBy?.user_image;

  return (
    <div className={`${styles.micro} ${className}`}>
      <span className={styles.label}>created by:</span>
      <span className={styles.author}>
        {avatar ? (
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className={styles.avatar}
            draggable={false}
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden>
            {name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className={styles.name} title={name}>{name}</span>
      </span>

      <span className={styles.dot} aria-hidden>•</span>

      <span className={styles.label}>from:</span>
      <Link
        to={to}
        className={styles.channelLink}
        onClick={(e) => {e.stopPropagation(); onChannelClick?.()}}
        title={`Go to #${channelName}`}
        aria-label={`Open channel ${channelName}`}
      >
        <span className={styles.hash}>#</span>
        <span className={styles.channel} title={channelName}>{channelName}</span>
      </Link>
    </div>
  );
}
