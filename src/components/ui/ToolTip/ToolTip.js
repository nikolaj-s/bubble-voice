// src/components/ToolTip/Tooltip.jsx
import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import styles from "./ToolTip.module.css"

export const ToolTipParent = () => {
  return <div id="tool-tip-parent" />
}

const Tooltip = ({
  content,
  position = "top",
  children,
  disabled = false
}) => {
  const wrapperRef = useRef(null)
  const tooltipRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [triggerBox, setTriggerBox] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [tooltipSize, setTooltipSize] = useState({ w: 0, h: 0 })
  const [portalEl] = useState(() => document.createElement("div"))

  // mount/unmount the portal container
  useEffect(() => {
    document.body.appendChild(portalEl)
    return () => void document.body.removeChild(portalEl)
  }, [portalEl])

  // when tooltip becomes visible, measure the trigger element
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

  // once tooltip DOM is painted, measure its own size
  useLayoutEffect(() => {
    if (visible && tooltipRef.current) {
      const { offsetWidth: w, offsetHeight: h } = tooltipRef.current
      setTooltipSize({ w, h })
    }
  }, [visible, content, position])

  if (disabled) {
    return <div ref={wrapperRef}>{children}</div>
  }

  // compute absolute positioning
  const getStyle = () => {
    const { x, y, w, h } = triggerBox
    const { w: tw, h: th } = tooltipSize
    let left = x + w / 2 - tw / 2
    let top

    switch (position) {
      case "top":
        top = y - th - 8
        break
      case "bottom":
        top = y + h + 8
        break
      case "left":
        left = x - tw - 8
        top = y
        break
      case "right":
      default:
        left = x + w + 8
        top = y
        break
    }

    return {
      position: "fixed",
      left: Math.round(left),
      top: Math.round(top)
    }
  }

  const tooltipNode = visible
    ? createPortal(
        <motion.div
          ref={tooltipRef}
          className={`
            ${styles.tooltip}
            ${styles['tooltip' + position.charAt(0).toUpperCase() + position.slice(1)]}
          `}
          style={getStyle()}
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
