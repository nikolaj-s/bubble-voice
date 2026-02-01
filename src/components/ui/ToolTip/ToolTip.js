import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import styles from "./ToolTip.module.css"

export const ToolTipParent = () => <div id="tool-tip-parent" />

const GAP = 8
const VIEWPORT_PADDING = 10
const ARROW_PAD = 14 // keep arrow away from rounded corners

const flipPosition = (pos) => {
  switch (pos) {
    case "top": return "bottom"
    case "bottom": return "top"
    case "left": return "right"
    case "right": return "left"
    default: return "top"
  }
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const Tooltip = ({
  content,
  position = "top",
  children,
  disabled = false,
  toolTipBackground
}) => {
  const wrapperRef = useRef(null)
  const tooltipRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [triggerBox, setTriggerBox] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [tooltipSize, setTooltipSize] = useState({ w: 0, h: 0 })
  const [portalEl] = useState(() => document.createElement("div"))

  useEffect(() => {
    let parentEl = document.getElementById("tool-tip-parent")
    if (!parentEl) {
      parentEl = document.createElement("div")
      parentEl.id = "tool-tip-parent"
      document.body.appendChild(parentEl)
    }
    parentEl.appendChild(portalEl)
    return () => void parentEl.removeChild(portalEl)
  }, [portalEl])

  useEffect(() => {
    if (!visible) return

    const measureTrigger = () => {
      const trigger = wrapperRef.current?.parentElement || wrapperRef.current
      if (!trigger) return
      const r = trigger.getBoundingClientRect()
      setTriggerBox({ x: r.left, y: r.top, w: r.width, h: r.height })
    }

    measureTrigger()
    window.addEventListener("scroll", measureTrigger, true)
    window.addEventListener("resize", measureTrigger)
    return () => {
      window.removeEventListener("scroll", measureTrigger, true)
      window.removeEventListener("resize", measureTrigger)
    }
  }, [visible])

  useLayoutEffect(() => {
    if (visible && tooltipRef.current) {
      const { offsetWidth: w, offsetHeight: h } = tooltipRef.current
      setTooltipSize({ w, h })
    }
  }, [visible, content])

  const computed = useMemo(() => {
    const { x, y, w, h } = triggerBox
    const { w: tw, h: th } = tooltipSize

    if (!tw || !th) {
      return {
        left: Math.round(x),
        top: Math.round(y),
        finalPosition: position,
        arrowX: "50%",
        arrowY: "50%",
      }
    }

    const vw = window.innerWidth
    const vh = window.innerHeight

    const triggerCenterX = x + w / 2
    const triggerCenterY = y + h / 2

    const calc = (pos) => {
      let left = x + w / 2 - tw / 2
      let top = y - th - GAP

      switch (pos) {
        case "top":
          top = y - th - GAP
          left = x + w / 2 - tw / 2
          break
        case "bottom":
          top = y + h + GAP
          left = x + w / 2 - tw / 2
          break
        case "left":
          top = y + h / 2 - th / 2
          left = x - tw - GAP
          break
        case "right":
        default:
          top = y + h / 2 - th / 2
          left = x + w + GAP
          break
      }

      return { left, top }
    }

    const overflows = (left, top) => {
      const right = left + tw
      const bottom = top + th
      return {
        left: left < VIEWPORT_PADDING,
        right: right > vw - VIEWPORT_PADDING,
        top: top < VIEWPORT_PADDING,
        bottom: bottom > vh - VIEWPORT_PADDING
      }
    }

    // preferred
    let finalPosition = position
    let { left, top } = calc(finalPosition)
    let of = overflows(left, top)

    // flip if overflow in the intended direction
    const shouldFlip =
      (finalPosition === "top" && of.top) ||
      (finalPosition === "bottom" && of.bottom) ||
      (finalPosition === "left" && of.left) ||
      (finalPosition === "right" && of.right)

    if (shouldFlip) {
      finalPosition = flipPosition(finalPosition)
      ;({ left, top } = calc(finalPosition))
      of = overflows(left, top)
    }

    // clamp tooltip box
    const minLeft = VIEWPORT_PADDING
    const maxLeft = Math.max(VIEWPORT_PADDING, vw - VIEWPORT_PADDING - tw)
    const minTop = VIEWPORT_PADDING
    const maxTop = Math.max(VIEWPORT_PADDING, vh - VIEWPORT_PADDING - th)

    const clampedLeft = clamp(left, minLeft, maxLeft)
    const clampedTop = clamp(top, minTop, maxTop)

    // arrow offset inside tooltip (px) -> set as percentage or px
    // For top/bottom: arrow uses X axis
    const arrowXPxRaw = triggerCenterX - clampedLeft
    const arrowXPx = clamp(arrowXPxRaw, ARROW_PAD, tw - ARROW_PAD)
    const arrowX = `${Math.round(arrowXPx)}px`

    // For left/right: arrow uses Y axis
    const arrowYPxRaw = triggerCenterY - clampedTop
    const arrowYPx = clamp(arrowYPxRaw, ARROW_PAD, th - ARROW_PAD)
    const arrowY = `${Math.round(arrowYPx)}px`

    return {
      left: Math.round(clampedLeft),
      top: Math.round(clampedTop),
      finalPosition,
      arrowX,
      arrowY,
    }
  }, [triggerBox, tooltipSize, position])

  if (disabled) {
    return <div ref={wrapperRef}>{children}</div>
  }

  const tooltipNode = visible
    ? createPortal(
        <motion.div
          ref={tooltipRef}
          className={`
            ${styles.tooltip}
            ${styles["tooltip" + computed.finalPosition.charAt(0).toUpperCase() + computed.finalPosition.slice(1)]}
          `}
          style={{
            position: "fixed",
            left: computed.left,
            top: computed.top,
            backgroundColor: toolTipBackground,
            "--tip-arrow-x": computed.arrowX,
            "--tip-arrow-y": computed.arrowY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {content}
        </motion.div>,
        portalEl
      )
    : null

  return (
    <div
      ref={wrapperRef}
      className={styles.tooltipContainer}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {tooltipNode}
    </div>
  )
}

export default Tooltip
