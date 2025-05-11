import React, { useEffect, useRef, useState } from 'react';

const RedditAudioSrc = ({ url, hasAudioFunction = () => {}, currentTime, isPlaying, volume = 1, muted}) => {
        
    const audioRef = useRef(null);

    const [audioUrl, setAudioUrl] = useState(null);

    // 1. Check if it's a Reddit video URL
    useEffect(() => {

        if (!url || !url.includes('v.redd.it')) return;

        const match = url.match(/^https:\/\/v\.redd\.it\/([^/]+)/);

        if (!match) return;

        const id = match[1];

        const newAudio = `https://v.redd.it/${id}/DASH_AUDIO_128.mp4`;

        setAudioUrl(newAudio);

    }, [url, hasAudioFunction]);

    // 3. Sync play/pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
        audio.play().catch(() => {}); // silence autoplay errors
        } else {
        audio.pause();
        }
    }, [isPlaying]);

    // 4. Sync current time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !isFinite(currentTime)) return;

        audio.currentTime = currentTime;

    }, [currentTime]);

    // 5. Sync volume
    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = volume;
        }
    }, [volume]);

    return <audio key={audioUrl} autoPlay onLoadedData={(e) => {hasAudioFunction(); e.target.volume = volume}} ref={audioRef} src={audioUrl} preload="auto" muted={muted} playsInline style={{display: 'none'}} hidden={true} />;
};

export default RedditAudioSrc;
