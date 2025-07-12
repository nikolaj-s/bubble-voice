import React, { useRef, useEffect, useState } from 'react'
import styles from './ServerLayoutWrapper.module.css'

export const ServerLayoutWrapper = ({ children, hideUsers = false }) => {
  const containerRef = useRef()

  // Default and bounds
  const defaultSizes = { '--users-width': 250, '--sidebar-width': 250 }
  const MIN = 200, MAX = 400

  const [canResize, setCanResize] = useState(window.innerWidth > 730)

  // On mount: initialize CSS vars & watch window size
  useEffect(() => {
    const c = containerRef.current

    // Helper to set a var
    const setVar = (name, px) => c.style.setProperty(name, `${px}px`)

    // Load saved or default
    let saved = {}
    try { saved = JSON.parse(localStorage.getItem('layoutSizes')) || {} }
    catch {}

    Object.entries(defaultSizes).forEach(([varName, def]) => {
      const val = typeof saved[varName] === 'number' ? saved[varName] : def
      setVar(varName, val)
    })

    // Handle viewport changes
    const onResize = () => {
      const ok = window.innerWidth > 730
      setCanResize(ok)
      if (!ok) {
        // reset to defaults
        Object.entries(defaultSizes).forEach(([v, def]) => setVar(v, def))
      } else {
        // restore saved
        let s2 = {}
        try { s2 = JSON.parse(localStorage.getItem('layoutSizes')) || {} }
        catch {}
        Object.entries(defaultSizes).forEach(([v, def]) => {
          const val = typeof s2[v] === 'number' ? s2[v] : def
          setVar(v, val)
        })
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Create a drag handler factory
  const makeDrag = (varName, isLeft) => (e) => {
    if (!canResize) return
    e.preventDefault()

    const c = containerRef.current
    const startX = e.clientX
    let initial = parseInt(
      getComputedStyle(c).getPropertyValue(varName),
      10
    )
    if (isNaN(initial)) initial = defaultSizes[varName]

    let newSize = initial

    const onMouseMove = (ev) => {
      const delta = isLeft
        ? ev.clientX - startX
        : startX - ev.clientX
      newSize = Math.max(MIN, Math.min(MAX, initial + delta))
      c.style.setProperty(varName, `${newSize}px`)
    }

    const onMouseUp = () => {
      // persist the final size
      try {
        const raw = localStorage.getItem('layoutSizes')
        const s = raw ? JSON.parse(raw) : {}
        s[varName] = newSize
        localStorage.setItem('layoutSizes', JSON.stringify(s))
      } catch {}

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        hideUsers ? styles.hideUsers : ''
      }`}
    >
      {/* Left resizer */}
      {canResize && (
        <div
          className={`${styles.resizer} ${styles.resizerLeft}`}
          onMouseDown={makeDrag('--users-width', true)}
        />
      )}

      {children}

      {/* Right resizer */}
      {!hideUsers && canResize && (
        <div
          className={`${styles.resizer} ${styles.resizerRight}`}
          onMouseDown={makeDrag('--sidebar-width', false)}
        />
      )}
    </div>
  )
}
