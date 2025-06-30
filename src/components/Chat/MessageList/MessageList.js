// MessageList.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import { MessageItem } from "../MessageItem/MessageItem";
import MessageItemSkeleton from "../MessageItem/MessageItemSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import FeedStartMessage from "../FeedStartMessage/FeedStartMessage";
import { MessageScrollWrapper } from "../MessageScrollWrapper/MessageScrollWrapper";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [sendCounter, setSendCounter] = useState(0);

  const [showLoading, toggleShowLoading] = useState(false);

  useLayoutEffect(() => {
    if (loading || loadingMore || messages.length === 0) return;

    const messageId = searchParams.get('message');
    if (!messageId) return;

    const wrapper = document.getElementById('chat-scroll-wrapper');
    const el      = document.getElementById(`message-id-${messageId}`);

    if (el && wrapper) {
      // clear the search param so we only run this once
      setSearchParams({});

      // calculate the offset of the message *within* the wrapper:
      const wrapperRect = wrapper.getBoundingClientRect();
      const elRect      = el.getBoundingClientRect();

      // current scroll + (element top relative to wrapper)
      const targetScrollTop =
        wrapper.scrollTop + (elRect.top - wrapperRect.top)
          // center it (optional)
          - (wrapper.clientHeight / 2 - el.offsetHeight / 2);

      // scroll the wrapper
      wrapper.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'instant'
      });

      // highlight it briefly
      requestAnimationFrame(() => {
        el.style.backgroundColor = 'var(--accent-color)';
        setTimeout(() => (el.style.backgroundColor = ''), 1000);
      });
    }
    else if (!el && wrapper) {
      console.log('loading more messages from scroll to message handler')
      // if it hasn’t been rendered yet, load more
      loadMoreMessages();
    }
  }, [loading, loadingMore, messages.length, searchParams, setSearchParams, loadMoreMessages]);

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
  // eslint-disable-next-line
  }, [messages, id])

  useEffect(() => {

    let timeout;

    if (loading) {
      timeout = setTimeout(() => {

        toggleShowLoading(true);

      }, 500)
    } else {
      toggleShowLoading(false);
    }

    return () => {
      clearTimeout(timeout);
    }

  }, [loading])
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
      {showLoading
        ? Array.from({ length: 20 }).map((_, i) => (
            <MessageItemSkeleton key={i} hasImage={i % 3 === 0} />
          ))
        : // Otherwise render all fetched messages
          oldestFirst.map((msg, idx) => (
            <MessageItem
              key={msg._id}
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
