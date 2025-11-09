import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFullscreen } from '../../../../features/Ui/uiSlice'

const isElectron = !!window?.electron

const NativeFullScreenWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const fullscreen = useSelector(state => state.uiSlice.fullscreen)
  const wrapperRef = useRef(null)

  // when redux fullscreen changes, toggle either Web API (browser/mac) or Electron IPC (Windows)
  useEffect(() => {
    if (isElectron) {
      window?.electron?.toggleFullscreen(fullscreen)
    } else {
      const el = wrapperRef.current
      if (fullscreen && el && !document.fullscreenElement) {
        el.requestFullscreen?.()
      } else if (!fullscreen && document.fullscreenElement) {
        document.exitFullscreen?.()
      }
    }
  }, [fullscreen])

  // listen for actual full-screen changes from Electron main
  useEffect(() => {
    if (!isElectron) return

    const handler = (flag) => {
      // if user hit F11 or exited via ESC, keep Redux in sync
      if (flag !== fullscreen) {
        dispatch(setFullscreen(flag))
      }
    }
    window.electron.onFullscreenChanged(handler)
    return () => {
      // no direct removeListener, but you could track a ref and call .removeAllListeners
    }
  }, [fullscreen, dispatch])

  // also sync ESC in browser mode
  useEffect(() => {
    
    const onKey = (e) => {
      if (fullscreen && e.key === 'Escape') {
        dispatch(setFullscreen(false))
      }
    }
    window.addEventListener('keyup', onKey)
    return () => window.removeEventListener('keyup', onKey)
  }, [fullscreen, dispatch])

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }} className='fullScreenWrapper'>
      {children}
    </div>
  )
}

export default NativeFullScreenWrapper
