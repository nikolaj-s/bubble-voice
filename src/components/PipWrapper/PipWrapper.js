import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import styles from './PipWrapper.module.css';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { Eye, EyeOff } from 'lucide-react';

export default function PipWrapper({
  isPip = false,
  children,
  initialCorner = 'bottom-right',
  pipWidth = 320,
  margin = 12,
  title = "Return",
  onClose,
  peekSize = 28, // how much remains visible when hidden
}) {
  const wrapperRef = useRef(null);
  const draggingRef = useRef(false);
  const pointerIdRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });
  const originRef = useRef({ x: 0, y: 0 });

  // maintain 16:9
  const pipHeight = Math.round((pipWidth * 9) / 16);

  const [pos, setPos] = useState(() => ({ x: null, y: null }));
  const [isDragging, setIsDragging] = useState(false);

  // NEW: collapse state + remember last good onscreen position
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastPosRef = useRef({ x: null, y: null });
  const [dockSide, setDockSide] = useState('right'); // 'left' | 'right'

  // initialize position to chosen corner on mount
  useEffect(() => {
    if (!isPip) return;

    const setCornerPos = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const elW = pipWidth;
      const elH = pipHeight;

      let x = w - elW - margin;
      let y = h - elH - margin;

      if (initialCorner === 'top-left') { x = margin; y = margin; }
      if (initialCorner === 'top-right') { x = w - elW - margin; y = margin; }
      if (initialCorner === 'bottom-left') { x = margin; y = h - elH - margin; }

      setPos({ x, y });
      lastPosRef.current = { x, y };
      setDockSide(x + elW / 2 < w / 2 ? 'left' : 'right');
    };

    setCornerPos();

    const onResize = () => setCornerPos();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isPip, initialCorner, margin, pipWidth, pipHeight]);

  // If leaving pip mode, ensure we reset collapse
  useEffect(() => {
    if (!isPip) setIsCollapsed(false);
  }, [isPip]);

  const clampToViewport = useCallback((x, y, elW, elH) => {
    const maxX = Math.max(0, window.innerWidth - elW - margin);
    const maxY = Math.max(0, window.innerHeight - elH - margin);
    return {
      x: Math.min(Math.max(margin, x), maxX),
      y: Math.min(Math.max(margin, y), maxY),
    };
  }, [margin]);

  const snapToCorner = useCallback((x, y, elW, elH) => {
    const corners = [
      { name: 'top-left', x: margin, y: margin },
      { name: 'top-right', x: window.innerWidth - elW - margin, y: margin },
      { name: 'bottom-left', x: margin, y: window.innerHeight - elH - margin },
      { name: 'bottom-right', x: window.innerWidth - elW - margin, y: window.innerHeight - elH - margin },
    ];
    let best = corners[0];
    let bestDist = Infinity;

    for (const c of corners) {
      const dx = c.x - x;
      const dy = c.y - y;
      const d = dx * dx + dy * dy;
      if (d < bestDist) { bestDist = d; best = c; }
    }
    return { x: best.x, y: best.y };
  }, [margin]);

  // NEW: compute dock side based on current x
  const computeDockSide = useCallback((x) => {
    const centerX = x + pipWidth / 2;
    return centerX < window.innerWidth / 2 ? 'left' : 'right';
  }, [pipWidth]);

  const toggleCollapsed = useCallback((e) => {
    e?.stopPropagation?.();

    // Don’t allow toggling mid-drag
   if (isDragging) return;

    if (!isCollapsed) {
      // going hidden: store last visible position and choose dock side
      if (pos?.x != null && pos?.y != null) {
        lastPosRef.current = { x: pos.x, y: pos.y };
        setDockSide(computeDockSide(pos.x));
      }
      setIsCollapsed(true);
    } else {
      // coming back: restore position
      const lp = lastPosRef.current;
      if (lp?.x != null && lp?.y != null) {
        const { x, y } = clampToViewport(lp.x, lp.y, pipWidth, pipHeight);
        setPos({ x, y });
      }
      setIsCollapsed(false);
    }
  }, [isCollapsed, isDragging, pos, clampToViewport, pipWidth, pipHeight, computeDockSide]);

  // Pointer handlers
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onPointerDown = (ev) => {
      if (!isPip) return;
      if (isCollapsed) return; // NEW: no dragging while collapsed

      if (ev.target?.closest?.('[data-nodrag]')) return;

      if (ev.button && ev.button !== 0) return;

      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      pointerIdRef.current = ev.pointerId;
      draggingRef.current = true;
      setIsDragging(true);

      const rect = el.getBoundingClientRect();
      originRef.current = { x: rect.left, y: rect.top };
      startRef.current = { x: ev.clientX, y: ev.clientY };
      el.style.transition = 'none';
    };

    const onPointerMove = (ev) => {
      if (!isPip) return;
      if (!draggingRef.current || pointerIdRef.current !== ev.pointerId) return;
      ev.preventDefault();

      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;
      const newX = originRef.current.x + dx;
      const newY = originRef.current.y + dy;

      const { x, y } = clampToViewport(newX, newY, pipWidth, pipHeight);
      setPos({ x, y });
      lastPosRef.current = { x, y };
    };

    const onPointerUp = (ev) => {
      if (!isPip) return;
      if (!draggingRef.current || pointerIdRef.current !== ev.pointerId) return;

      draggingRef.current = false;
      pointerIdRef.current = null;
      setIsDragging(false);

      const rect = el.getBoundingClientRect();
      const target = snapToCorner(rect.left, rect.top, rect.width, rect.height);

      setDockSide(computeDockSide(target.x));

      el.style.transition = 'transform 200ms cubic-bezier(.2,.8,.2,1)';
      setPos({ x: target.x, y: target.y });
      lastPosRef.current = { x: target.x, y: target.y };

      try { el.releasePointerCapture(ev.pointerId); } catch (e) {}
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isPip, isCollapsed, pipWidth, pipHeight, clampToViewport, snapToCorner, computeDockSide]);

  // NEW: extra translate when collapsed (leave a "tab" visible)
  const collapseTranslate = useMemo(() => {
    if (!isPip || !isCollapsed) return { x: 0, y: 0 };

    // Move off-screen horizontally, leaving peekSize visible
    // If docked right: shift + (pipWidth - peekSize)
    // If docked left: shift - (pipWidth - peekSize)
    const shift = Math.max(0, pipWidth - peekSize);
    return dockSide === 'left'
      ? { x: -shift, y: 0 }
      : { x: shift, y: 0 };
  }, [isPip, isCollapsed, dockSide, pipWidth, peekSize]);

  // Compute transform style only when pip active and position known
  const transformStyle = (isPip && pos.x != null)
    ? {
        width: pipWidth,
        height: pipHeight,
        transform: `translate3d(${Math.round(pos.x + collapseTranslate.x)}px, ${Math.round(pos.y + collapseTranslate.y)}px, 0)`,
      }
    : {};

  return (
    <div
      ref={wrapperRef}
      className={isPip ? styles.pip : styles.normal}
      style={transformStyle}
      aria-hidden={false}
      // NEW: if collapsed, clicking the visible tab restores it
      onClick={isPip && isCollapsed ? toggleCollapsed : undefined}
      role={isPip && isCollapsed ? "button" : undefined}
      tabIndex={isPip && isCollapsed ? 0 : undefined}
      onKeyDown={(e) => {
        if (!(isPip && isCollapsed)) return;
        if (e.key === 'Enter' || e.key === ' ') toggleCollapsed(e);
      }}
    >
      <div className={styles.content}>{children}</div>

      {isPip && (
        <div className={styles.overlay}>
          <div
            className={styles.title}
            onClick={(e) => {
              e.stopPropagation();
              // keep your existing title click behavior if needed
            }}
          >
            <span className={styles.titleText}>{title}</span>

            <div className={styles.controls} data-nodrag>
              <IconButton
                Icon={isCollapsed ? Eye : EyeOff}
                title={isCollapsed ? 'Show' : 'Hide'}
                onClick={toggleCollapsed}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
