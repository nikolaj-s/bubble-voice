import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFullscreen } from '../../../../features/Ui/uiSlice';

const NativeFullScreenWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const fullscreen = useSelector((state) => state.uiSlice.fullscreen);

  const wrapperRef = useRef(null);

  // Trigger fullscreen based on Redux state
  useEffect(() => {
    const element = wrapperRef.current;

    if (fullscreen && element && !document.fullscreenElement) {
      element.requestFullscreen?.();
    } else if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [fullscreen]);

  // Sync fullscreen state on ESC or browser UI exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isActive = !!document.fullscreenElement;
      if (!isActive && fullscreen) {
        dispatch(setFullscreen(false));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fullscreen, dispatch]);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (fullscreen && e.key === 'Escape') {
        dispatch(setFullscreen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreen, dispatch]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default NativeFullScreenWrapper;
