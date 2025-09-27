
import React, {useCallback, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { setScreenshot, setScreenshotPreview } from '../features/Screenshot/screenshotSlice';
import { triggerAlert } from '../features/Alerts/alertsSlice';

export const useScreenshot = () => {
  const dispatch = useDispatch();

  const isCapturingRef = useRef(false);
  const lastCaptureAtRef = useRef(0);
  const lastAlertAtRef = useRef(0);

  const COOLDOWN_MS = 1500;        // block rapid re-clicks
  const ALERT_COOLDOWN_MS = 800;   // don't spam alerts either

  const captureScreenshot = useCallback(async () => {
    const now = Date.now();
    const elapsed = now - lastCaptureAtRef.current;

    // Block if already capturing
    if (isCapturingRef.current) return;

    // Block if within cooldown → trigger alert
    if (elapsed < COOLDOWN_MS) {
      // throttle alert itself
      if (now - lastAlertAtRef.current > ALERT_COOLDOWN_MS) {
        const msLeft = COOLDOWN_MS - elapsed;
        const secLeft = Math.max(1, Math.ceil(msLeft / 1000));
        dispatch(
          triggerAlert(`Please wait… try again in ~${secLeft}s`, 'error')
        );
        lastAlertAtRef.current = now;
      }
      return;
    }

    isCapturingRef.current = true;

    try {
      const ipc = window?.electron?.ipcRenderer;
      if (!ipc) throw new Error('IPC not available');

      const resp = await ipc.invoke('SCREEN_SHOT');

      if (resp?.error) throw new Error(resp.error);

      if (resp?.data) dispatch(setScreenshot(resp.data));
      if (resp?.preview) dispatch(setScreenshotPreview(resp.preview));
    } catch (err) {
      console.error(err);
      dispatch(triggerAlert('Error Capturing Screenshot', 'error'));
    } finally {
      lastCaptureAtRef.current = Date.now();
      isCapturingRef.current = false;
    }
  }, [dispatch]);

  const clearScreenshot = useCallback(() => {
    dispatch(setScreenshot(null));
    dispatch(setScreenshotPreview(null));
  }, [dispatch]);

  return { captureScreenshot, clearScreenshot };
};
