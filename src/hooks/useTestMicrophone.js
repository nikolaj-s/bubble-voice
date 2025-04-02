import { useState, useEffect, useRef } from 'react';

const useTestMicrophone = (speechThreshold, deviceId = null) => {
  const [micVolume, setMicVolume] = useState(0); // Track the mic volume
  const audioContextRef = useRef(null); // To store the audio context
  const analyserRef = useRef(null); // To store the analyser node
  const mediaStreamRef = useRef(null); // To store the media stream
  const bufferLengthRef = useRef(null); // To store the frequency buffer length
  const dataArrayRef = useRef(null); // To store the frequency data array
  const animationFrameRef = useRef(null); // For animation frame handling
  const speakingRef = useRef(false); // To track if speech is detected
  const audioSourceRef = useRef(null); // Store the audio source node
  const gainNodeRef = useRef(null); // Store the gain node for microphone feedback

  useEffect(() => {
    // Initialize the audio context and microphone stream
    const initAudioProcessing = async () => {
      try {
        // Create an audio context to analyze the audio
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Get access to the microphone with optional deviceId
        const constraints = {
          audio: deviceId
            ? { deviceId: { exact: deviceId } }
            : true, // Use default device if no deviceId is provided
        };

        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints);

        // Create a media stream source node
        const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048; // Larger FFT for better frequency accuracy
        bufferLengthRef.current = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLengthRef.current);

        // Connect the source to the analyser node
        source.connect(analyserRef.current);

        // Create a GainNode to allow the user to hear the microphone input
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.setValueAtTime(1, audioContextRef.current.currentTime); // Set volume to 100%

        
        // Connect analyser to the gain node, and gain node to the destination (i.e., speakers)
        analyserRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        // Function to detect microphone volume
        const detectVolume = () => {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          // Calculate the volume based on the average of the frequency data
          const total = dataArrayRef.current.reduce((sum, value) => sum + value, 0);
          const average = total / bufferLengthRef.current;

          // Update the state with the calculated average volume
          setMicVolume(average);

          // Check if the mic volume surpasses the speech threshold
          if (average > speechThreshold) {
            if (!speakingRef.current) {
              speakingRef.current = true;
              console.log("Speech detected - activating voice producer.");

              gainNodeRef.current.gain.setValueAtTime(1, audioContextRef.current.currentTime); // Set volume to 100%

            }
          } else if (speakingRef.current) {
            speakingRef.current = false;
            console.log("Speech stopped - pausing voice producer.");
            
            gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime); // Set volume to 100%

          }

          // Continue detecting volume
          animationFrameRef.current = requestAnimationFrame(detectVolume);
        };

        // Start detecting volume
        detectVolume();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    // Initialize the audio processing
    initAudioProcessing();

    // Clean up when the component is unmounted
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
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
    };
  }, [speechThreshold, deviceId]);

  return micVolume;
};

export default useTestMicrophone;
