import React, {
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import styles from "./MessageScrollWrapper.module.css";

import { LoadingWheel } from "../../ui/Loading/LoadingWheel/LoadingWheel";

export const MessageScrollWrapper = ({
  children,
  persistKey,
  loadMore,           // fn to load older messages
  loadingOlder,       // bool
  noMore,             // bool
  scrollToBottomFlag,
  scrollPos,
  loading // number that increments when sending
}) => {
  const ref = useRef(null);
  const didInit = useRef(false);
  const prevScrollHeight = useRef(0);
  const prevLoading = useRef(false);

  // 1. After first render of messages, restore saved or go bottom
  useEffect(() => {
    

    let raf = requestAnimationFrame(() => {
      
      const el = ref.current;

      if (!el || didInit.current || loading) return;

      const saved = sessionStorage.getItem(`scroll-pos-${persistKey}`);
      // only once after there is at least one child
     
      if (saved !== null) {
        el.scrollTop = Number(saved);
      } else {
        
        // scroll to bottom
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }

      didInit.current = true;
    })
     
    return () => {
      cancelAnimationFrame(raf);
    }

  }, [persistKey, loading]);

  // 2. Persist scroll on every scroll & fire loadMore at top
  const handleScroll = useCallback(
    (e) => {
      if (children.length === 0 || loading) return;

      const el = e.target;
     
      sessionStorage.setItem(
        `scroll-pos-${persistKey}`,
        el.scrollTop
      );

      // near the top? top = scrollTop <= 50px
      if (
        el.scrollTop <= 50 &&
        !loadingOlder &&
        !noMore
      ) {
        loadMore();
      }
    },
    [loadMore, loadingOlder, noMore, persistKey, children, loading]
  );

  // 3. When loadingOlder toggles, adjust scrollTop so view doesn’t jump
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!prevLoading.current && loadingOlder) {
      // started loading older
      prevScrollHeight.current = el.scrollHeight;
    }
    if (prevLoading.current && !loadingOlder) {
      // finished loading older
      const diff = el.scrollHeight - prevScrollHeight.current;
      el.scrollTop = el.scrollTop + diff;
    }
    prevLoading.current = loadingOlder;
  }, [loadingOlder, children]);

 // 4. Scroll to bottom when flag increments (i.e. on send)
  React.useEffect(() => {

    if (scrollToBottomFlag > 0) {
      const el = ref.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight - el.clientHeight;
      sessionStorage.setItem(
        `scroll-pos-${persistKey}`,
        el.scrollTop
      );
    }
    
  }, [scrollToBottomFlag, persistKey]);

  return (
   <div
      className={styles.container}
      ref={ref}
      onScroll={handleScroll}
      id={'chat-scroll-wrapper'}
    >
      {loadingOlder && (
        <div className={styles.spinnerWrapper}>
          <LoadingWheel />
        </div>
      )}
      {children}
    </div>
  );
};

MessageScrollWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  persistKey: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  loadingOlder: PropTypes.bool,
  noMore: PropTypes.bool,
  scrollToBottomFlag: PropTypes.number,
};
