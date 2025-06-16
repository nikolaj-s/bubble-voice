// hooks/useTestMicrophone.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioContext } from '../context/AudioContext';

const useTestMicrophone = (
  speechThreshold = 0,
  deviceId = null,
  echoCancellation = true,
  noiseSuppression = true,
  autoGainControl = false
) => {
  const ctx = useAudioContext();           // shared AudioContext
  const [volume, setVolume]       = useState(0);
  const [isSpeaking, setSpeaking] = useState(false);

  // Refs for our audio graph & stream
  const streamRef     = useRef(null);
  const sourceRef     = useRef(null);
  const analyserRef   = useRef(null);
  const dataRef       = useRef(null);
  const gainNodeRef   = useRef(null);
  const frameRef      = useRef(null);
  const speakingRef   = useRef(false);
  const historyRef    = useRef([]);

  // Cleanup function, wrapped in useCallback so it's stable
  const cleanup = useCallback(() => {
    // stop the animation loop
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    // disconnect audio nodes
    sourceRef.current?.disconnect();
    analyserRef.current?.disconnect();
    gainNodeRef.current?.disconnect();
    // stop the mic
    streamRef.current?.getTracks().forEach(t => t.stop());

    // reset everything
    streamRef.current   = null;
    sourceRef.current   = null;
    analyserRef.current = null;
    dataRef.current     = null;
    gainNodeRef.current = null;
    historyRef.current  = [];
    speakingRef.current = false;
    setVolume(0);
    setSpeaking(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const detect = () => {
      if (cancelled) return;
      const analyser = analyserRef.current;
      const dataArr  = dataRef.current;
      if (!analyser || !dataArr) return;

      analyser.getByteFrequencyData(dataArr);
      let sum = 0;
      for (let v of dataArr) sum += v;
      const raw = sum / dataArr.length;

      const H = historyRef.current;
      H.push(raw);
      if (H.length > 10) H.shift();
      const smooth = H.reduce((a, b) => a + b, 0) / H.length;

      const pct = Math.min(100, (smooth / 255) * 100);
      setVolume(pct);

      if (pct >= speechThreshold) {
        if (!speakingRef.current) {
          speakingRef.current = true;
          setSpeaking(true);
        }
      } else {
        if (speakingRef.current) {
          speakingRef.current = false;
          setSpeaking(false);
        }
      }

      frameRef.current = requestAnimationFrame(detect);
    };

    const init = async () => {
      try {
        const constraints = {
          audio: {
            echoCancellation,
            noiseSuppression,
            autoGainControl,
            ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;

        const source = ctx.createMediaStreamSource(stream);
        sourceRef.current = source;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;
        source.connect(analyser);

        dataRef.current = new Uint8Array(analyser.frequencyBinCount);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(1, ctx.currentTime);
        gainNodeRef.current = gainNode;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        detect();
      } catch (err) {
        console.error('useTestMicrophone init failed:', err);
      }
    };

    init();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [
    ctx,
    speechThreshold,
    deviceId,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    cleanup
  ]);

  return { volume, isSpeaking };
};

export default useTestMicrophone;
