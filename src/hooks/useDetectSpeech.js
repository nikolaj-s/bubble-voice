// hooks/useDetectSpeech.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { throwMicrophoneError } from '../features/Channel/MediaControl/mediaControlSlice';
import { useAudioContext } from '../context/AudioContext';

// simple debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);
  return debounced;
}

export const useDetectSpeech = (
  isMicrophoneMuted,
  pauseProducer,
  resumeProducer,
  speechThreshold = 25,
  usingPushToTalk,
  deviceId = null,
  echoCancellation = true,
  noiseSuppression = true,
  autoGainControl = false
) => {
  const dispatch = useDispatch();
  const ctx = useAudioContext();

  const [level, setLevel] = useState(0);
  const [isSpeaking, setSpeaking] = useState(false);

  // refs for callbacks so we can omit them from deps
  const pauseRef  = useRef(pauseProducer);
  const resumeRef = useRef(resumeProducer);
  useEffect(() => { pauseRef.current = pauseProducer }, [pauseProducer]);
  useEffect(() => { resumeRef.current = resumeProducer }, [resumeProducer]);

  // debounce speech threshold
  const debouncedThreshold = useDebounce(speechThreshold, 200);

  // all the streaming/analyser refs
  const streamRef       = useRef(null);
  const sourceRef       = useRef(null);
  const analyserRef     = useRef(null);
  const dataArrRef      = useRef(null);
  const rafIdRef        = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const historyRef      = useRef([]);
  const speakingRef     = useRef(false);

  // utility to clean up everything
  const cleanup = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current);
    clearTimeout(pauseTimeoutRef.current);

    sourceRef.current?.disconnect();
    analyserRef.current?.disconnect();
    streamRef.current?.getTracks().forEach(t => t.stop());

    streamRef.current = null;
    sourceRef.current = null;
    analyserRef.current = null;
    dataArrRef.current = null;
    rafIdRef.current   = null;
    pauseTimeoutRef.current = null;
    historyRef.current = [];
    speakingRef.current = false;

    setLevel(0);
    setSpeaking(false);
  }, []);

  useEffect(() => {
    // if muted or using PTT, just clean up
    if (isMicrophoneMuted || usingPushToTalk) {
      cleanup();
      return;
    }

    // build constraints
    const constraints = {
      audio: {
        echoCancellation,
        noiseSuppression,
        autoGainControl,
        ...(deviceId ? { deviceId: { exact: deviceId } } : {})
      }
    };

    let mounted = true;

    // detection loop
    const detect = () => {
      const analyser = analyserRef.current;
      const dataArr  = dataArrRef.current;
      if (!analyser || !dataArr || !mounted) return;

      analyser.getByteFrequencyData(dataArr);
      let sum = 0;
      for (let i = 0; i < dataArr.length; i++) sum += dataArr[i];
      const raw = sum / dataArr.length;

      const hist = historyRef.current;
      hist.push(raw);
      if (hist.length > 10) hist.shift();
      const smooth = hist.reduce((a, b) => a + b, 0) / hist.length;

      const pct = Math.min(100, (smooth / 255) * 100);
      setLevel(pct);

      if (pct >= debouncedThreshold) {
        if (!speakingRef.current) {
          speakingRef.current = true;
          setSpeaking(true);
          resumeRef.current('microphone');
        }
        clearTimeout(pauseTimeoutRef.current);
      } else if (speakingRef.current && !pauseTimeoutRef.current) {
        pauseTimeoutRef.current = setTimeout(() => {
          speakingRef.current = false;
          setSpeaking(false);
          pauseRef.current('microphone');
          pauseTimeoutRef.current = null;
        }, 200);
      }

      rafIdRef.current = requestAnimationFrame(detect);
    };

    // init
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        if (!mounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        src.connect(analyser);

        sourceRef.current   = src;
        analyserRef.current = analyser;
        dataArrRef.current  = new Uint8Array(analyser.frequencyBinCount);

        detect();
      })
      .catch(err => {
        if (!mounted) return;
        cleanup();
        let msg = err.message;
        if (err.name === 'NotAllowedError') msg = 'Microphone access was denied.';
        else if (err.name === 'NotFoundError') msg = 'No microphone device found.';
        dispatch(throwMicrophoneError(msg));
      });

    return () => {
      mounted = false;
      cleanup();
    };
  }, [
    ctx,
    dispatch,
    deviceId,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    usingPushToTalk,
    isMicrophoneMuted,
    debouncedThreshold,
    cleanup
  ]);

  return { level, isSpeaking };
};
