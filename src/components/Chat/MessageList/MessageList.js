// MessageList.jsx
import React, { useState, useEffect } from "react";
import { MessageItem } from "../MessageItem/MessageItem";
import MessageItemSkeleton from "../MessageItem/MessageItemSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import FeedStartMessage from "../FeedStartMessage/FeedStartMessage";
import { MessageScrollWrapper } from "../MessageScrollWrapper/MessageScrollWrapper";

const MessageList = ({
  id,                    // channel id, used as persistKey
  messages = [],         // newest-first
  loadMoreMessages,      // function to fetch older
  loading,               // initial load
  loadingMore,           // loading older?
  sending,               // message object being sent (truthy when sending)
  users = {},
  noMoreMessages,        // boolean when no more older messages
  name,                  // channel name (for FeedStartMessage)
  reply, 
  returnPos                // reply callback
}) => {
  // we need a numeric flag that changes whenever `sending` changes
  const [sendCounter, setSendCounter] = useState(0);
  useEffect(() => {
    if (sending) {
      setSendCounter((c) => c + 1);
    }
  }, [sending]);

  useEffect(() => {

    return () => {
      if (messages.length === 0) return;

      returnPos({count: messages.length, last_message_id: messages[messages.length - 1]?._id, channel_id: id});

    }
  }, [messages, returnPos, id])
  // reverse the array so we pass oldest → newest into the wrapper
  const oldestFirst = [...messages].reverse();

  return (
    <MessageScrollWrapper
      persistKey={id}
      loadMore={loadMoreMessages}
      loadingOlder={loadingMore}
      noMore={noMoreMessages}
      scrollToBottomFlag={sendCounter}
      loading={loading}
    >
       {/* At the very top, if we’ve hit the oldest message... */}
      {noMoreMessages && (
        <FeedStartMessage channelName={name} />
      )}
      {/* Show "sending" item at the bottom (latest) */}
     

      {/* Show skeletons on initial load */}
      {loading
        ? Array.from({ length: 20 }).map((_, i) => (
            <MessageItemSkeleton key={i} hasImage={i % 3 === 0} />
          ))
        : // Otherwise render all fetched messages
          oldestFirst.map((msg, idx) => (
            <MessageItem
              key={msg.message_id}
              message={msg}
              users={users}
              reply={reply}
              // pass prevMessage if you need it; example below:
              prevMessage={oldestFirst[idx - 1] || {}}
            />
          ))}

      {sending && (
        <AnimatePresence>
          <motion.div
            key="sending"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <MessageItem users={users} message={sending} loading={true} />
          </motion.div>
        </AnimatePresence>
      )}
      {/* You already get a spinner from MessageScrollWrapper when loadingMore */}
      {/* But if you want a second indicator here, you can add it */}
    </MessageScrollWrapper>
  );
};

export default MessageList;
