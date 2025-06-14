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

  // NEW: State to track if unlock is needed
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const [unlockTries, setUnlockTries] = useState(0);

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const removeTrack = (userId) => {
    try {
      const entry = tracksRef.current.get(userId);
      if (!entry) return;
      // Safely disconnect everything
      try { entry.src?.disconnect(); } catch {}
      try { entry.gain?.disconnect(); } catch {}
      try { entry.el?.remove(); } catch {}
      try { entry.mediaStream?.getTracks().forEach(t => t.stop()); } catch {}
      tracksRef.current.delete(userId);
    } catch (err) {
      console.warn('Failed to fully clean up audio track:', err);
    }
  };

  const getAudioContext = async () => {
    let ctx = audioCtxRef.current;
    if (ctx.state === 'closed') {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
    }
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (err) {
        // Mark as needing unlock
        setNeedsAudioUnlock(true);
        throw err;
      }
    }
    return ctx;
  };

  /**
   * Add a MediaStream or single MediaStreamTrack for a user
   */
  const addTrack = useCallback(async (userId, streamOrTrack) => {
    try {
      console.log(userId)
      if (tracksRef.current.has(userId)) {
        removeTrack(userId);
      }

      const mediaStream =
        streamOrTrack instanceof MediaStream
          ? streamOrTrack
          : new MediaStream([streamOrTrack]);

      let exists = document.getElementById(userId);
      if (exists) exists.remove();

      let el = document.createElement('audio');
      el.hidden = true;
      el.autoplay = true;
      el.srcObject = mediaStream;
      el.volume = 0;
      el.muted = false;
      el.id = `${userId}`;
      el.playsInline = true;
      document.body.appendChild(el);

      // Try to create and connect audio context
      let audioCtx;
      try {
        audioCtx = await getAudioContext();
      } catch (err) {
        // Can't unlock yet, user needs to tap to enable
        setNeedsAudioUnlock(true);
        return;
      }

      const src = audioCtx.createMediaStreamSource(mediaStream);
      const gain = audioCtx.createGain();
      src.connect(gain);
      gain.connect(audioCtx.destination);

      const volPercent = clamp(volumes[userId] ?? 0.5, 0, 2.5);
      gain.gain.value = isAudioMuted ? 0 : volPercent;

      let audio_ref = {
        user: userId,
        src,
        gain,
        el,
        mediaStream
      };

      tracksRef.current.set(userId, audio_ref);

      // Try to resume context, if needed
      try {
        await audioCtx.resume();
      } catch (err) {
        setNeedsAudioUnlock(true);
      }
    } catch (error) {
      setNeedsAudioUnlock(true);
      console.log(error);
    }
  }, [isAudioMuted, volumes]);

  // Unlock audio on user gesture
  const handleUnlockAudio = async () => {
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      // Unmute and play all audio elements, just in case
      tracksRef.current.forEach(entry => {
        try {
          entry.el.muted = false;
          entry.el.volume = 1;
          // Call play in case the browser needs a gesture to start
          entry.el.play?.().catch(() => {});
        } catch (e) {}
      });
      setNeedsAudioUnlock(false);
      setUnlockTries(v => v + 1);
    } catch (e) {
      // Still not allowed
      setNeedsAudioUnlock(true);
    }
  };

  // Reactively update gains when volume changes
  useEffect(() => {
   
    tracksRef.current.forEach((entry, userId) => {
      const volPercent = clamp(volumes[userId] ?? 0.5, 0, 2.5);
      entry.gain.gain.value = volPercent;
    });
  }, [volumes]);

  useEffect(() => {
    tracksRef.current.forEach((entry, userId) => {
      
      const volPercent = clamp(volumes[userId] ?? 0.5, 0, 2.5);
      entry.gain.gain.value = isAudioMuted ? 0 : volPercent;
    });
  // eslint-disable-next-line
  }, [isAudioMuted, unlockTries]);

  // Cleanup all tracks/context on unmount
  useEffect(() => {
    return () => {
      tracksRef.current.forEach((_, userId) => removeTrack(userId));
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
    };
  }, []);

    // audioCtxRef is your AudioContext reference
  const resumeAudio = () => {
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  useEffect(() => {
    const events = ['touchstart', 'mousedown', 'keydown'];
    events.forEach(e => window.addEventListener(e, resumeAudio, true));
    return () => events.forEach(e => window.removeEventListener(e, resumeAudio, true));
  }, []);


  // Expose context value
  const contextValue = {
    addTrack,
    removeTrack,
    tracks: tracksRef.current,
  };

  return (
    <UserAudioContext.Provider value={contextValue}>
      {needsAudioUnlock && (<AudioUnlockToast onUnlock={handleUnlockAudio} />)}
      {children}
    </UserAudioContext.Provider>
  );
};

export const useUserAudio = () => {
  const context = useContext(UserAudioContext);
  return context;
};
