// RecentPostsByChannel.js
import React from "react";
import PropTypes from "prop-types";
import { Hash } from "lucide-react";
import styles from "./RecentPostsByChannel.module.css";
import { useNavigate } from "react-router";

export default function RecentPostsByChannel({
  groupedByChannel = {},
  channels = {},
  users,
  MessageItem,
  action
}) {

  const navigate = useNavigate();

  const entries = React.useMemo(
    () => Object.entries(groupedByChannel || {}),
    [groupedByChannel]
  );

  const goToChannel = (message) => {

    if (!message) return;

    navigate(`/dashboard/server/${message?.server_id}/channel/${message?.channel_id}?message=${message?._id}`)
  }

  if (!entries.length) return null;

  return (
    <div onClick={action} className={styles.wrapper}>
      {entries.map(([channelId, messages]) => {
        const channel = channels?.[channelId];
        const channelName = channel?.channel_name || "Unknown Channel";

        return (
          <div onClick={() => {goToChannel(messages[0])}} key={channelId} className={styles.channelCard}>
            <div className={styles.channelHeader}>
              <div className={styles.channelPill} title={channelName}>
                <Hash size={14} className={styles.hashIcon} />
                <span className={styles.channelName}>{channelName}</span>
              </div>

              <span className={styles.count}>{messages?.length || 0}</span>
            </div>

            <div className={styles.messages}>
              {messages.map((post) => (
                <MessageItem users={users} key={post._id} message={post} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

