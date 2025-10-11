
import React, { useRef, useState, useEffect, useCallback } from 'react'
import styles from './PipWrapper.module.css'
import IconButton from '../ui/Buttons/IconButton/IconButton'
import {  Undo2 } from 'lucide-react'

export default function PipWrapper({ isPip = false, children, initialCorner = 'bottom-right', pipWidth = 320, margin = 12, title = "Return", onClose }) {
  const wrapperRef = useRef(null)
  const draggingRef = useRef(false)
  const pointerIdRef = useRef(null)
  const startRef = useRef({ x: 0, y: 0 })
  const originRef = useRef({ x: 0, y: 0 })

  // maintain 16:9
  const pipHeight = Math.round((pipWidth * 9) / 16)

  // single mounted state for position — this ensures children never unmount
  const [pos, setPos] = useState(() => ({ x: null, y: null }))
  const [isDragging, setIsDragging] = useState(false)

  // initialize position to chosen corner on mount
  useEffect(() => {
    if (!isPip) return
    const setCornerPos = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const elW = pipWidth
      const elH = pipHeight
      let x = w - elW - margin
      let y = h - elH - margin
      if (initialCorner === 'top-left') { x = margin; y = margin }
      if (initialCorner === 'top-right') { x = w - elW - margin; y = margin }
      if (initialCorner === 'bottom-left') { x = margin; y = h - elH - margin }
      setPos({ x, y })
    }
    setCornerPos()
    const onResize = () => setCornerPos()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isPip, initialCorner, margin, pipWidth, pipHeight])

  const clampToViewport = useCallback((x, y, elW, elH) => {
    const maxX = Math.max(0, window.innerWidth - elW - margin)
    const maxY = Math.max(0, window.innerHeight - elH - margin)
    return {
      x: Math.min(Math.max(margin, x), maxX),
      y: Math.min(Math.max(margin, y), maxY)
    }
  }, [margin])

  const snapToCorner = useCallback((x, y, elW, elH) => {
    const corners = [
      { name: 'top-left', x: margin, y: margin },
      { name: 'top-right', x: window.innerWidth - elW - margin, y: margin },
      { name: 'bottom-left', x: margin, y: window.innerHeight - elH - margin },
      { name: 'bottom-right', x: window.innerWidth - elW - margin, y: window.innerHeight - elH - margin }
    ]
    let best = corners[0]
    let bestDist = Infinity
    for (const c of corners) {
      const dx = c.x - x
      const dy = c.y - y
      const d = dx * dx + dy * dy
      if (d < bestDist) { bestDist = d; best = c }
    }
    return { x: best.x, y: best.y }
  }, [margin])

  // pointer handlers are attached to the wrapper; when isPip is true dragging from anywhere in the
  // wrapper will start (including over child content). We removed the dedicated handle and overlay so
  // dragging can begin from any point inside the PiP.
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onPointerDown = (ev) => {
      if (!isPip) return // ignore when not pip (keeps child mounted but non-interactive for drag)
      // only primary button or touch
      if (ev.button && ev.button !== 0) return
      // if a child uses pointer events for its own interactions, calling preventDefault here may
      // interfere; we only prevent default for primary pointer to ensure smooth dragging.
      try { el.setPointerCapture(ev.pointerId) } catch (e) {}
      pointerIdRef.current = ev.pointerId
      draggingRef.current = true
      setIsDragging(true)

      const rect = el.getBoundingClientRect()
      originRef.current = { x: rect.left, y: rect.top }
      startRef.current = { x: ev.clientX, y: ev.clientY }
      el.style.transition = 'none'
    }

    const onPointerMove = (ev) => {
      if (!isPip) return
      if (!draggingRef.current || pointerIdRef.current !== ev.pointerId) return
      ev.preventDefault()
      const dx = ev.clientX - startRef.current.x
      const dy = ev.clientY - startRef.current.y
      const newX = originRef.current.x + dx
      const newY = originRef.current.y + dy
      const { x, y } = clampToViewport(newX, newY, pipWidth, pipHeight)
      setPos({ x, y })
    }

    const onPointerUp = (ev) => {
      if (!isPip) return
      if (!draggingRef.current || pointerIdRef.current !== ev.pointerId) return
      draggingRef.current = false
      pointerIdRef.current = null
      setIsDragging(false)

      const rect = el.getBoundingClientRect()
      const target = snapToCorner(rect.left, rect.top, rect.width, rect.height)
      el.style.transition = 'transform 200ms cubic-bezier(.2,.8,.2,1)'
      setPos({ x: target.x, y: target.y })
      try { el.releasePointerCapture(ev.pointerId) } catch(e){}
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [isPip, pipWidth, pipHeight, clampToViewport, snapToCorner])

  // compute transform style only when pip is active and position known
  const transformStyle = (isPip && pos.x != null)
    ? { width: pipWidth, height: pipHeight, transform: `translate3d(${Math.round(pos.x)}px, ${Math.round(pos.y)}px, 0)` }
    : {}

  return (
    <div
      ref={wrapperRef}
      className={isPip ? styles.pip : styles.normal}
      style={transformStyle}
      aria-hidden={false}
    >
      <div className={styles.content}>{children}</div>
      {isPip && (
        <div className={styles.overlay}>
            <div onClick={(e) => {e.stopPropagation(); console.log('clicking')}} className={styles.title}>
                {/* <IconButton 
                Icon={Undo2}
                title={'Return'}
                onClick={onClose}
                /> */}
                {title}
            </div>
        </div>
      )}
    </div>
  )
}

