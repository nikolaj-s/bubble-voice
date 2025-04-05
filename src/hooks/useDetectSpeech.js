import { useEffect, useRef } from 'react';

export const useDetectSpeech = (isMicrophoneMuted, pauseProducer, resumeProducer, speechThreshold = 25, usingPushToTalk) => {
    
    const audioContextRef = useRef(null);

    const analyserRef = useRef(null);

    const mediaStreamRef = useRef(null);

    const animationFrameRef = useRef(null);

    const speakingRef = useRef(false);

    const pauseTimeoutRef = useRef(null);

    // Stores past energy levels to smooth detection
    const energyHistory = useRef([]);

    useEffect(() => {
        if (isMicrophoneMuted || usingPushToTalk) return;

        const initAudioProcessing = async () => {
            try {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

                const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048; // Larger FFT for better frequency accuracy

                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                source.connect(analyserRef.current);

                const detectSpeech = () => {
                    analyserRef.current.getByteFrequencyData(dataArray);

                    // Focus on human speech frequency range
                    const lowFreqRange = dataArray.slice(4, 15);  // 85-300Hz (human speech)
                    const midFreqRange = dataArray.slice(15, 50); // Additional speech harmonics

                    // Compute average energy in voice frequency ranges
                    const lowFreqAvg = lowFreqRange.reduce((sum, value) => sum + value, 0) / lowFreqRange.length;
                    const midFreqAvg = midFreqRange.reduce((sum, value) => sum + value, 0) / midFreqRange.length;
                    
                    // Weighted sum to emphasize mid frequencies more
                    const combinedVoiceEnergy = (lowFreqAvg * 0.4) + (midFreqAvg * 0.6); 

                    // Update history for smoothing
                    energyHistory.current.push(combinedVoiceEnergy);
                    if (energyHistory.current.length > 10) energyHistory.current.shift(); // Keep only the last 10 frames

                    // Apply smoothing: take the moving average
                    const smoothedEnergy = energyHistory.current.reduce((sum, value) => sum + value, 0) / energyHistory.current.length;

                    // Speech detection threshold (adjustable)
                     // Increase this if still too sensitive
                    const pauseDelay = 200; // Delay in ms before pausing

                    if (smoothedEnergy > speechThreshold) {
                        if (!speakingRef.current) {
                            speakingRef.current = true;
                            resumeProducer('microphone');
                        }
                        if (pauseTimeoutRef.current) {
                            clearTimeout(pauseTimeoutRef.current);
                            pauseTimeoutRef.current = null;
                        }
                    } else if (speakingRef.current && !pauseTimeoutRef.current) {
                        pauseTimeoutRef.current = setTimeout(() => {
                            speakingRef.current = false;
                            pauseProducer('microphone');
                            pauseTimeoutRef.current = null;
                        }, pauseDelay);
                    }

                    animationFrameRef.current = requestAnimationFrame(detectSpeech);
                };

                detectSpeech();
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        initAudioProcessing();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, [isMicrophoneMuted, pauseProducer, resumeProducer, speechThreshold, usingPushToTalk]);
};
