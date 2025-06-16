// Context/UserAudioProvider.js
import React, {
  createContext,
  useRef,
  useCallback,
  useEffect,
  useContext,
  useState
} from 'react';
import { useGlobalVolume } from './GlobalVolumeContext';
import { useSelector } from 'react-redux';
import { useAudioContext } from './AudioContext';
import AudioUnlockToast from '../components/AudioUnlockToast/AudioUnlockToast';

const UserAudioContext = createContext({
  addTrack: () => {},
  removeTrack: () => {},
  tracks: new Map(),
});

export const UserAudioProvider = ({ children }) => {
  const ctx = useAudioContext();                     // ← shared AudioContext
  const { volumes } = useGlobalVolume();
  const { isAudioMuted } = useSelector(s => s.mediaControlSlice);

  const tracksRef = useRef(new Map());
  const debounceTimerRef = useRef();

  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const [unlockTries, setUnlockTries] = useState(0);

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const removeTrack = useCallback((userId) => {
    const entry = tracksRef.current.get(userId);
    if (!entry) return;

    try {
      entry.el.pause();
      entry.el.srcObject = null;
      entry.src.disconnect();
      entry.gain.disconnect();
      entry.mediaStream.getTracks().forEach(t => t.stop());
      entry.el.remove();
    } catch (err) {
      console.warn('Error cleaning up audio track:', err);
    }

    tracksRef.current.delete(userId);
  }, []);

  const addTrack = useCallback(async (userId, streamOrTrack) => {
    // prevent double‐connect
    if (tracksRef.current.get(userId)?.connecting) return;
    tracksRef.current.set(userId, { connecting: true });

    try {
      removeTrack(userId);

      const mediaStream = streamOrTrack instanceof MediaStream
        ? streamOrTrack
        : new MediaStream([streamOrTrack]);

      // create audio element
      const el = document.createElement('audio');
      el.hidden = true;
      el.autoplay = true;
      el.srcObject = mediaStream;
      el.muted = false;
      el.volume = 0;
      el.playsInline = true;
      document.body.appendChild(el);

      // if suspended, try to resume
      if (ctx.state === 'suspended') {
        try {
          await ctx.resume();
        } catch {
          setNeedsAudioUnlock(true);
          throw new Error('Audio context suspended');
        }
      }

      // connect into shared context
      const src  = ctx.createMediaStreamSource(mediaStream);
      const gain = ctx.createGain();
      src.connect(gain);
      gain.connect(ctx.destination);

      // initial volume
      const vol = clamp(volumes[userId] ?? 0.5, 0, 2.5);
      gain.gain.value = isAudioMuted ? 0 : vol;

      // store
      tracksRef.current.set(userId, { userId, src, gain, el, mediaStream });

    } catch (error) {
      setNeedsAudioUnlock(true);
      console.error('addTrack failed:', error);
    }
  }, [ctx, isAudioMuted, volumes, removeTrack]);

  const handleUnlockAudio = async () => {
    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      // unmute & replay all
      tracksRef.current.forEach(({ el }) => {
        try {
          el.muted = false;
          el.volume = 1;
          el.play().catch(() => {});
        } catch {}
      });
      setNeedsAudioUnlock(false);
      setUnlockTries(n => n + 1);
    } catch {
      setNeedsAudioUnlock(true);
    }
  };

  // debounce volume updates
  useEffect(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      tracksRef.current.forEach((entry, userId) => {
        const vol = clamp(volumes[userId] ?? 0.5, 0, 2.5);
        try {
          entry.gain.gain.setTargetAtTime(
            isAudioMuted ? 0 : vol,
            ctx.currentTime,
            0.02
          );
        } catch (e) {
          console.warn(`Failed to update gain for ${userId}`, e);
        }
      });
    }, 100);
    return () => clearTimeout(debounceTimerRef.current);
  }, [volumes, isAudioMuted, ctx]);

  // cleanup on unmount (do NOT close shared ctx)
  useEffect(() => {
    return () => {
      tracksRef.current.forEach((_, userId) => removeTrack(userId));
    };
  }, [removeTrack]);

  // auto‐resume on user gesture
  useEffect(() => {
    const resumeAudio = () => {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    };
    ['touchstart', 'mousedown', 'keydown'].forEach(e =>
      window.addEventListener(e, resumeAudio, true)
    );
    return () =>
      ['touchstart', 'mousedown', 'keydown'].forEach(e =>
        window.removeEventListener(e, resumeAudio, true)
      );
  }, [ctx]);

  return (
    <UserAudioContext.Provider value={{
      addTrack,
      removeTrack,
      tracks: tracksRef.current
    }}>
      {needsAudioUnlock && (
        <AudioUnlockToast onUnlock={handleUnlockAudio} />
      )}
      {children}
    </UserAudioContext.Provider>
  );
};

export const useUserAudio = () => useContext(UserAudioContext);
