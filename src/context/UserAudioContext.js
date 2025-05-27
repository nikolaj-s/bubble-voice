// src/contexts/UserAudioContext.jsx
import {
  createContext,
  useRef,
  useCallback,
  useEffect,
  useContext
} from 'react';
import { useGlobalVolume } from './GlobalVolumeContext';
import { useSelector } from 'react-redux';

const UserAudioContext = createContext({
  addTrack: () => {},
  removeTrack: () => {},
  tracks: new Map(),
});

export const UserAudioProvider = ({ children }) => {
    // Read per-user volumes (0–250%) from the global provider
    const { volumes } = useGlobalVolume();

    const {isAudioMuted} = useSelector(state => state.mediaControlSlice);

    // Single AudioContext for this room
    const audioCtxRef = useRef(new (window.AudioContext || window.webkitAudioContext)());

    // Store for { userId → { sourceNode, gainNode, mediaStream } }
    const tracksRef = useRef(new Map());

    // Utility clamp
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    /**
     * Remove and disconnect everything for a given userId
     */
    const removeTrack = (userId) => {
        try {
            const entry = tracksRef.current.get(userId);

            if (!entry) return;
            
            // disconnect WebAudio nodes
            entry.sourceNode?.disconnect();

            entry.gainNode?.disconnect();

            entry.el?.remove();

            entry.mediaStream.getTracks().forEach(t => t.stop());
            console.log(entry.el)
            tracksRef.current.delete(userId);
        } catch (err) {
            console.warn(err);

        }
       
    };

  // helper to always give us a running AudioContext
    const getAudioContext = async () => {
        let ctx = audioCtxRef.current;
        console.log(ctx)
        // If it was closed, make a fresh one
        if (ctx.state === 'closed') {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            audioCtxRef.current = ctx;
        }

        // If it’s suspended (the default until a user gesture), resume it
        if (ctx.state === 'suspended') {
            try {
            await ctx.resume();
            console.log('[UserAudio] AudioContext resumed');
            } catch (err) {
            console.warn('[UserAudio] resume() failed', err);
            }
        }

        return ctx;
    };

    /**
   * Add a MediaStream or single MediaStreamTrack for a user
   */
    const addTrack = useCallback(async (userId, streamOrTrack) => {
        try {
            // 1) Tear down any existing track for this user
            if (tracksRef.current.has(userId)) {
                removeTrack(userId);
            }

            // 2) Wrap a lone track into a MediaStream
            const mediaStream =
            streamOrTrack instanceof MediaStream
                ? streamOrTrack
                : new MediaStream([streamOrTrack]);

            let exists = document.getElementById(`user-audio-stream-src-${userId}`);

            if (exists) exists.remove();

            let el = document.createElement('audio');

            el.hidden = true;

            el.autoplay = true;
            
            el.srcObject = mediaStream;

            el.volume = 0;

            el.muted = true;

            el.id = `user-audio-stream-src-${userId}`;

            document.body.appendChild(el);

            // 3) Make sure our AudioContext is running
            const audioCtx = await getAudioContext();
            
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
            }

            tracksRef.current.set(userId, audio_ref);

            console.log(audioCtx)
        } catch (error) {
            console.log(error);
        }
    }, [isAudioMuted, volumes])

    /**
     * Whenever global volumes change, update the gain nodes
     */
    useEffect(() => {
        console.log('modifying volume');

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
    }, [isAudioMuted])

    /**
     * Cleanup everything on provider unmount
     */
    // after:
    useEffect(() => {
        return () => {
            console.log('tearing down tracks')
            // 1) Tear down all user tracks
            tracksRef.current.forEach((_, userId) => removeTrack(userId));

            // 2) Only close if not already closed
            const ctx = audioCtxRef.current;
            if (ctx && ctx.state !== 'closed') {
            ctx.close().catch(() => {
                // swallow if it somehow errors
            });
            }
        };
    }, []);


    // Expose context value
    const contextValue = {
        addTrack,
        removeTrack,
        tracks: tracksRef.current,
    };

    return (
        <UserAudioContext.Provider value={contextValue}>
        {children}
        </UserAudioContext.Provider>
    );
};

export const useUserAudio = () => {
    const context = useContext(UserAudioContext);

    return context;
}
