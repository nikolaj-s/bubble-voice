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
import AudioUnlockToast from '../components/AudioUnlockToast/AudioUnlockToast';

const UserAudioContext = createContext({
  addTrack: () => {},
  removeTrack: () => {},
  tracks: new Map(),
});

export const UserAudioProvider = ({ children }) => {
  const { volumes } = useGlobalVolume();
  const { isAudioMuted } = useSelector(state => state.mediaControlSlice);

  const audioCtxRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const tracksRef = useRef(new Map());
  const debounceTimerRef = useRef();

  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const [unlockTries, setUnlockTries] = useState(0);

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const getAudioContext = async () => {
    let ctx = audioCtxRef.current;
    if (!ctx || ctx.state === 'closed') {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
    }
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        setNeedsAudioUnlock(true);
        throw new Error('Audio context suspended');
      }
    }
    return ctx;
  };

  const removeTrack = (userId) => {
    const entry = tracksRef.current.get(userId);
    if (!entry) return;

    try {
      entry.el.pause();
      entry.el.srcObject = null;
      entry.src?.disconnect();
      entry.gain?.disconnect();
      entry.mediaStream?.getTracks().forEach(t => t.stop());
      entry.el?.remove();
    } catch (err) {
      console.warn('Error cleaning up audio track:', err);
    }

    tracksRef.current.delete(userId);
  };

  const addTrack = useCallback(async (userId, streamOrTrack) => {
    if (tracksRef.current.get(userId)?.connecting) return;

    // Mark as connecting to prevent conflicts
    tracksRef.current.set(userId, { connecting: true });

    try {
      removeTrack(userId); // Clean up first

      const mediaStream =
        streamOrTrack instanceof MediaStream
          ? streamOrTrack
          : new MediaStream([streamOrTrack]);

      const el = document.createElement('audio');
      el.hidden = true;
      el.autoplay = true;
      el.srcObject = mediaStream;
      el.volume = 0;
      el.muted = false;
      el.id = `${userId}`;
      el.playsInline = true;
      document.body.appendChild(el);

      const audioCtx = await getAudioContext();

      const src = audioCtx.createMediaStreamSource(mediaStream);
      const gain = audioCtx.createGain();

      src.connect(gain);
      gain.connect(audioCtx.destination);

      const vol = clamp(volumes[userId] ?? 0.5, 0, 2.5);
      gain.gain.value = isAudioMuted ? 0 : vol;

      tracksRef.current.set(userId, {
        user: userId,
        src,
        gain,
        el,
        mediaStream
      });

      await audioCtx.resume();
    } catch (error) {
      setNeedsAudioUnlock(true);
      console.error('addTrack failed:', error);
    }
  }, [isAudioMuted, volumes]);

  const handleUnlockAudio = async () => {
    try {
      const ctx = await getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();

      tracksRef.current.forEach(entry => {
        try {
          entry.el.muted = false;
          entry.el.volume = 1;
          entry.el.play?.().catch(() => {});
        } catch {}
      });

      setNeedsAudioUnlock(false);
      setUnlockTries(v => v + 1);
    } catch {
      setNeedsAudioUnlock(true);
    }
  };

  // Debounced gain updates
  useEffect(() => {
    clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      const audioCtx = audioCtxRef.current;
      if (!audioCtx) return;

      tracksRef.current.forEach((entry, userId) => {
        const volPercent = clamp(volumes[userId] ?? 0.5, 0, 2.5);
        try {
          entry.gain?.gain.setTargetAtTime(volPercent, audioCtx.currentTime, 0.02);
        } catch (e) {
          console.warn(`Failed to update gain for ${userId}`, e);
        }
      });
    }, 100);

    return () => clearTimeout(debounceTimerRef.current);
  }, [volumes]);

  useEffect(() => {
    tracksRef.current.forEach((entry, userId) => {
      const vol = clamp(volumes[userId] ?? 0.5, 0, 2.5);
      if (entry?.gain) {
        entry.gain.gain.value = isAudioMuted ? 0 : vol;
      }
    });
  // eslint-disable-next-line
  }, [isAudioMuted, unlockTries]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      tracksRef.current.forEach((_, userId) => removeTrack(userId));
      const ctx = audioCtxRef.current;
      if (ctx?.state !== 'closed') {
        ctx.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    const resumeAudio = () => {
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };

    const events = ['touchstart', 'mousedown', 'keydown'];
    events.forEach(e => window.addEventListener(e, resumeAudio, true));
    return () => events.forEach(e => window.removeEventListener(e, resumeAudio, true));
  }, []);

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
