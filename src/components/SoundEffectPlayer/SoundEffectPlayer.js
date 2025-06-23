// src/components/SoundEffectPlayer.jsx
import React, { useEffect, useRef } from 'react';
import { useSelector }                from 'react-redux';
import { SOUND_EFFECTS }              from '../../features/SoundEffects/soundEffectsSlice';

export default function SoundEffectPlayer() {
  const { soundKey, lastPlayed, volume } = useSelector(
    state => state.soundEffectsSlice
  );
  const audioRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (!soundKey) {
      // no sound requested → pause & reset
      audioEl.pause();
      audioEl.currentTime = 0;
      return;
    }

    const src = SOUND_EFFECTS[soundKey];
    if (!src) return;

    // if re-playing the same soundKey, rewind and play again
    audioEl.src = src;
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {
      /* play blocked? ignore */
    });
  }, [soundKey, lastPlayed]);

  useEffect(() => {

    const audioEl = audioRef.current;

    if (audioEl) {
        audioEl.volume = volume;
    }

  }, [volume])

  return (
    // hidden so it doesn’t show up in your UI, but still in the DOM
    <audio ref={audioRef} style={{ display: 'none' }} />
  );
}
