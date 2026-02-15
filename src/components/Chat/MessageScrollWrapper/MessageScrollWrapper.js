import React, { useRef, useLayoutEffect, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./MessageScrollWrapper.module.css";
import { LoadingWheel } from "../../ui/Loading/LoadingWheel/LoadingWheel";

const TOP_RESET_PX = 260;
const SETTLE_MS = 250;      // short window to re-apply restore if height keeps changing
const MAX_REAPPLY = 6;      // safety cap

function getFirstVisibleAnchorOffset(el) {
  if (!el) return null;

  const scrollTop = el.scrollTop;
  const nodes = el.querySelectorAll("[data-msgid]");
  if (!nodes?.length) return null;

  for (const node of nodes) {
    const top = node.offsetTop;
    const bottom = top + node.offsetHeight;
    if (bottom > scrollTop + 1) {
      return { id: node.getAttribute("data-msgid"), offset: top - scrollTop };
    }
  }

  const first = nodes[0];
  return { id: first.getAttribute("data-msgid"), offset: first.offsetTop - scrollTop };
}

function restoreAnchorOffset(el, anchor) {
  if (!el || !anchor?.id) return false;

  const node = el.querySelector(`[data-msgid="${CSS.escape(anchor.id)}"]`);
  if (!node) return false;

  const targetTop = node.offsetTop - (anchor.offset ?? 0);
  el.scrollTop = Math.max(0, targetTop);
  return true;
}

function withNoSmoothNoAnchor(el, fn) {
  if (!el) return;

  const prevBehavior = el.style.scrollBehavior;
  const prevOverflowAnchor = el.style.overflowAnchor;

  el.style.scrollBehavior = "auto";
  el.style.overflowAnchor = "none";

  try {
    fn();
  } finally {
    // restore next frame so the scrollTop write commits first
    requestAnimationFrame(() => {
      el.style.scrollBehavior = prevBehavior;
      el.style.overflowAnchor = prevOverflowAnchor;
    });
  }
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
  const contentRef = useRef(null);

  const didInit = useRef(false);

  // top-zone arming + lock
  const topArmedRef = useRef(true);
  const fetchLockRef = useRef(false);

  // pending restore
  const pendingRestoreRef = useRef(false);
  const pendingAnchorRef = useRef(null);

  // settle mode: temporarily lock scroll + re-apply on height changes
  const settlingRef = useRef(false);
  const settleEndAtRef = useRef(0);
  const lastHeightRef = useRef(0);
  const reapplyCountRef = useRef(0);

  // 1) Init scroll position
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (!el || didInit.current || loading) return;

      const saved = sessionStorage.getItem(`scroll-pos-${persistKey}`);
      if (saved !== null) el.scrollTop = Number(saved);
      else el.scrollTop = el.scrollHeight - el.clientHeight;

      didInit.current = true;
    });

    return () => cancelAnimationFrame(raf);
  }, [persistKey, loading]);

  // Persist scroll + re-arm
  const handleScroll = useCallback(
    (e) => {
      const el = e.target;
      if (!el || loading) return;

      // If we are in settle mode, block user scroll to avoid fighting/jumps
      if (settlingRef.current) {
        // immediately undo user scroll attempt by snapping back to stored pos
        // (we don't store per-event; we just prevent changes)
        e.preventDefault?.();
        return;
      }

      sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));

      if (el.scrollTop > TOP_RESET_PX) {
        topArmedRef.current = true;
      }
    },
    [persistKey, loading]
  );

  // 3) Trigger loadMore when top sentinel is visible
  useEffect(() => {
    const root = scrollerRef.current;
    const sentinel = topSentinelRef.current;
    if (!root || !sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        if (loading) return;
        if (loadingOlder) return;
        if (noMore) return;

        if (!topArmedRef.current) return;
        if (fetchLockRef.current) return;

        const el = scrollerRef.current;
        if (!el) return;

        topArmedRef.current = false;
        fetchLockRef.current = true;

        pendingAnchorRef.current = getFirstVisibleAnchorOffset(el);
        pendingRestoreRef.current = true;

        loadMore();
      },
      { root, threshold: 0.01, rootMargin: "150px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loadingOlder, noMore, loading]);

  // unlock fetch lock when loadingOlder completes
  useEffect(() => {
    if (!loadingOlder) fetchLockRef.current = false;
  }, [loadingOlder]);

  // Helper: start settle mode
  const startSettle = useCallback((el) => {
    settlingRef.current = true;
    settleEndAtRef.current = performance.now() + SETTLE_MS;
    lastHeightRef.current = el.scrollHeight;
    reapplyCountRef.current = 0;

    // prevent wheel/touch scroll during settle window
    el.style.pointerEvents = "none";

    // end settle
    const t = setTimeout(() => {
      const node = scrollerRef.current;
      if (node) node.style.pointerEvents = "";
      settlingRef.current = false;
    }, SETTLE_MS);

    return () => clearTimeout(t);
  }, []);

  // 5) Apply restore immediately when loadingOlder becomes false (no arbitrary delay)
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // only restore at the end of a load-more cycle
    if (!pendingRestoreRef.current) return;
    if (loadingOlder) return;

    const anchor = pendingAnchorRef.current;
    if (!anchor?.id) {
      pendingRestoreRef.current = false;
      pendingAnchorRef.current = null;
      return;
    }

    // apply restore immediately
    withNoSmoothNoAnchor(el, () => {
      restoreAnchorOffset(el, anchor);
    });

    sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));

    // begin settle mode: any subsequent height changes in next ~250ms get a re-apply
    const cleanup = startSettle(el);

    // clear pending
    pendingRestoreRef.current = false;
    pendingAnchorRef.current = anchor; // keep it for settle reapply

    return cleanup;
  }, [loadingOlder, persistKey, startSettle]);

  // 5.5) ResizeObserver: during settle window, if scrollHeight changes, re-apply restore
  useEffect(() => {
    const el = scrollerRef.current;
    const contentEl = contentRef.current;
    if (!el || !contentEl) return;

    const ro = new ResizeObserver(() => {
      if (!settlingRef.current) return;

      const now = performance.now();
      if (now > settleEndAtRef.current) return;

      const h = el.scrollHeight;
      if (h === lastHeightRef.current) return;

      lastHeightRef.current = h;

      // safety cap
      reapplyCountRef.current += 1;
      if (reapplyCountRef.current > MAX_REAPPLY) return;

      const anchor = pendingAnchorRef.current;
      if (!anchor?.id) return;

      withNoSmoothNoAnchor(el, () => {
        restoreAnchorOffset(el, anchor);
      });

      sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));
    });

    ro.observe(contentEl);
    return () => ro.disconnect();
  }, [persistKey]);

  // 6) Scroll to bottom when sending
  useEffect(() => {
    if (scrollToBottomFlag > 0) {
      const el = scrollerRef.current;
      if (!el) return;

      withNoSmoothNoAnchor(el, () => {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });

      sessionStorage.setItem(`scroll-pos-${persistKey}`, String(el.scrollTop));
      topArmedRef.current = true;
    }
  }, [scrollToBottomFlag, persistKey]);

  return (
    <div className={styles.containerOuter}>
      {loadingOlder && (
        <div className={styles.spinnerOverlay}>
          <LoadingWheel />
        </div>
      )}

      <div
        className={styles.container}
        ref={scrollerRef}
        onScroll={handleScroll}
        id="chat-scroll-wrapper"
      >
        <div ref={topSentinelRef} style={{ height: 1 }} />
        {/* content wrapper is what ResizeObserver watches */}
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
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
