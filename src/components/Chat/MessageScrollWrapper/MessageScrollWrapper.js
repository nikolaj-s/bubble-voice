import React, { useRef, useLayoutEffect, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./MessageScrollWrapper.module.css";
import { LoadingWheel } from "../../ui/Loading/LoadingWheel/LoadingWheel";

const TOP_RESET_PX = 260; // must scroll away from top to re-arm

function getFirstVisibleAnchor(el) {
  if (!el) return null;

  const items = el.querySelectorAll("[data-msgid]");
  const containerTop = el.getBoundingClientRect().top;

  for (const node of items) {
    const r = node.getBoundingClientRect();
    if (r.bottom > containerTop + 1) {
      return {
        id: node.getAttribute("data-msgid"),
        top: r.top - containerTop, // offset inside container viewport
      };
    }
  }

  const first = items[0];
  if (!first) return null;
  const r = first.getBoundingClientRect();
  return { id: first.getAttribute("data-msgid"), top: r.top - containerTop };
}

function restoreAnchor(el, anchor) {
  if (!el || !anchor?.id) return false;

  const node = el.querySelector(`[data-msgid="${CSS.escape(anchor.id)}"]`);
  if (!node) return false;

  const containerTop = el.getBoundingClientRect().top;
  const newTop = node.getBoundingClientRect().top - containerTop;

  el.scrollTop += (newTop - anchor.top);
  return true;
}

export const MessageScrollWrapper = ({
  children,
  persistKey,
  loadMore,
  loadingOlder = false,
  noMore = false,
  scrollToBottomFlag = 0,
  loading,
}) => {
  const scrollerRef = useRef(null);
  const topSentinelRef = useRef(null);

  const didInit = useRef(false);

  // top-zone arming + immediate lock (independent of React state timing)
  const topArmedRef = useRef(true);
  const fetchLockRef = useRef(false);

  // anchor restore for prepend
  const pendingAnchor = useRef(null);
  const pendingRestore = useRef(false);

  // 1) Init: restore saved scroll or go bottom
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (!el || didInit.current || loading) return;

      const saved = sessionStorage.getItem(`scroll-pos-${persistKey}`);
      if (saved !== null) {
        el.scrollTop = Number(saved);
      } else {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }

      didInit.current = true;
    });

    return () => cancelAnimationFrame(raf);
  }, [persistKey, loading]);

  // 2) Persist scroll + re-arm logic
  const handleScroll = useCallback(
    (e) => {
      const el = e.target;
      if (!el || loading) return;

      sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));

      // Rearm once user scrolls down away from top
      if (el.scrollTop > TOP_RESET_PX) {
        topArmedRef.current = true;
      }
    },
    [persistKey, loading]
  );

  // 3) Trigger loadMore when top sentinel becomes visible (with arming + lock)
  useEffect(() => {
    const root = scrollerRef.current;
    const sentinel = topSentinelRef.current;
    if (!root || !sentinel) return;

    // If you want it to trigger a bit before true top, expand top margin.
    // Example: "150px 0px 0px 0px" means it triggers when sentinel is within 150px of top.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        // Hard gates
        if (loading) return;
        if (loadingOlder) return;
        if (noMore) return;

        // Arming + lock gates (prevents repeated fetches while staying at top)
        if (!topArmedRef.current) return;
        if (fetchLockRef.current) return;

        const el = scrollerRef.current;
        if (!el) return;

        // Disarm + lock immediately (prevents multiple calls in same frame)
        topArmedRef.current = false;
        fetchLockRef.current = true;

        // Capture anchor BEFORE loading prepends
        pendingAnchor.current = getFirstVisibleAnchor(el);
        pendingRestore.current = true;

        loadMore();
      },
      {
        root,
        threshold: 0.01,
        rootMargin: "150px 0px 0px 0px",
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loadingOlder, noMore, loading]);

  // 4) Unlock fetch lock when loadingOlder completes (or never starts)
  useEffect(() => {
    if (!loadingOlder) {
      fetchLockRef.current = false;
    }
  }, [loadingOlder]);

  // 5) Restore anchor after children changes (prepend), before paint
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (pendingRestore.current && pendingAnchor.current) {
      // pass 1: commit-time
      restoreAnchor(el, pendingAnchor.current);

      // pass 2: next frame (helps with spinner mount/unmount or quick layout shifts)
      const raf = requestAnimationFrame(() => {
        restoreAnchor(el, pendingAnchor.current);
        sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));

        pendingRestore.current = false;
        pendingAnchor.current = null;
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [children, persistKey]);

  // 6) Scroll to bottom when flag increments
  useEffect(() => {
    if (scrollToBottomFlag > 0) {
      const el = scrollerRef.current;
      if (!el) return;

      el.scrollTop = el.scrollHeight - el.clientHeight;
      sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));

      // Since we just jumped to bottom, we can re-arm top fetching for later
      topArmedRef.current = true;
    }
  }, [scrollToBottomFlag, persistKey]);

  return (
    <div
      className={styles.container}
      ref={scrollerRef}
      onScroll={handleScroll}
      id="chat-scroll-wrapper"
    >
      {/* Sentinel must be INSIDE scroller content at the top */}
      <div ref={topSentinelRef} style={{ height: 1 }} />

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
  loading: PropTypes.any,
};
