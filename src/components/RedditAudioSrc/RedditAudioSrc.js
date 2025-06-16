import React, { useEffect, useRef, useState } from 'react';

const RedditAudioSrc = ({ url, hasAudioFunction = () => {}, currentTime, isPlaying, volume = 1, muted, autoPlay = true }) => {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!url || !url.includes('v.redd.it') || url.includes('.m3u8')) return;

    const match = url.match(/^https:\/\/v\.redd\.it\/([^/]+)/);
    if (!match) return;

    const id = match[1];
    const newAudio = `https://v.redd.it/${id}/DASH_AUDIO_128.mp4`;
    setAudioUrl(newAudio);
  }, [url]);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Drift correction: sync currentTime only if out of sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isFinite(currentTime)) return;

    const drift = Math.abs(audio.currentTime - currentTime);
    if (drift > 0.3) { // 300ms tolerance
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  // Sync volume/mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  return (
    <audio
      key={audioUrl}
      autoPlay={autoPlay}
      playsInline
      preload="auto"
      ref={audioRef}
      muted={muted}
      src={audioUrl}
      style={{ display: 'none' }}
      onLoadedData={(e) => {
        hasAudioFunction(true);
        e.target.volume = volume;
      }}
    />
  );
};

export default RedditAudioSrc;
