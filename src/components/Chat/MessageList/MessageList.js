import React, { useRef } from "react";

import styles from "./MessageList.module.css";
import { MessageItem } from "../MessageItem/MessageItem";
import MessageItemSkeleton from "../MessageItem/MessageItemSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import FeedStartMessage from "../FeedStartMessage/FeedStartMessage";

const MessageList = ({
  position = 0, messages = [], loadMoreMessages = () => {}, 
  loading, loadingMore, sending, users = {}, 
  returnPos = () => {}, name,
  noMoreMessages
}) => {

  const listRef = useRef(null);

  const [showSkeleton, setShowSkeleton] = React.useState(false);

  const [isScrolling, toggleIsScrolling] = React.useState(false);

  const scrollTimeout = useRef(null);

  const scrollPosRef = React.useRef(0);

  React.useEffect(() => {

    const restoreScrollPos = () => {
      if (listRef.current) {
        listRef.current.scrollTop = scrollPosRef.current === 0 ? position : scrollPosRef.current;
      }
    }

    requestAnimationFrame(() => {
      restoreScrollPos();
    })

  }, [messages])

  const handleScroll = (e) => {
    // When scroll position reaches the top of the container
    scrollPosRef.current = e.target.scrollTop;

    if (Math.abs(e.target.scrollTop) + e.target.clientHeight + 10 >= (e.target.scrollHeight)) {
      loadMoreMessages();
    }

        // Enable scroll overlay
    toggleIsScrolling(true);

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      toggleIsScrolling(false);
    }, 300); // Adjust delay as needed
  };

  React.useEffect(() => {

    return () => {
      if (listRef.current) {
        listRef.current.querySelectorAll('img').forEach(img => {
          img.src = "";
        })
      }
    }
  }, [])

  React.useEffect(() => {

    if (sending) {
      listRef.current.scrollTop = 1;

      scrollPosRef.current = 1;
    }
     
  }, [sending])

  React.useEffect(() => {

    let timer;

    if (loading) {
      timer = setTimeout(() => {
        setShowSkeleton(true);
      }, 500)
    } else {
      setShowSkeleton(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);

  }, [loading]);

  // persist message count / scroll pos

  React.useEffect(() => {
    
    return () => {
      
      returnPos({channel_id: messages[0]?.channel_id, count: messages.length, position: scrollPosRef.current })
    
    }

  }, [messages])

  return (
    <div 
    
    className={styles.messageListContainer} ref={listRef} onScroll={handleScroll}>
      <AnimatePresence>
        
        {sending && (
          <motion.div
          key="sending"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1 }}
        >
          <MessageItem users={users} message={sending} loading={true} />
        </motion.div>

        )}
        {loading && showSkeleton ?
        [...Array.from({length: 20}, (_, i) => i)].map(i => (
          <MessageItemSkeleton key={i} hasImage={i % 3 === 0} />
        ))
        : messages.map((msg, index) => (
           <MessageItem users={users} prevMessage={index === messages.length - 1 ? {} : messages[index + 1]} message={msg} key={msg.message_id} />
        ))}
        {noMoreMessages && (<FeedStartMessage channelName={name}  />)}
        {loadingMore && (
          <div className={styles.loadingIndicator}>
            <div className={styles.spinner}></div>
          </div>
        )}

      </AnimatePresence>
     
    </div>
  );
};

export default MessageList;

