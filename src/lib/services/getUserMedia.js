

export const getMicrophoneMedia = async (device_id, echoCancellation = false, autoGainControl) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: device_id ? { exact: device_id } : undefined,
          echoCancellation,
          autoGainControl,
        }
      });
  
      const track = stream.getAudioTracks()[0];
      return track;
  
    } catch (error) {
      let friendlyMessage = "An unknown error occurred while accessing the microphone.";
  
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        friendlyMessage = "Microphone access was denied. Please enable it in your browser settings.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        friendlyMessage = "No microphone was found. Please connect one and try again.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        friendlyMessage = "Your microphone is currently being used by another application.";
      } else if (error.name === "OverconstrainedError") {
        friendlyMessage = `The selected microphone is not available.`;
      } else if (error.name === "SecurityError") {
        friendlyMessage = "Access to the microphone is not allowed due to insecure context (e.g., not HTTPS).";
      }
  
      return {
        error: true,
        errorMessage: friendlyMessage,
        rawError: error.message
      };
    }
  }
  

  export const getWebcamMedia = async (device_id) => {
    try {
      const constraints = {
        video: {
          deviceId: device_id ? { exact: device_id } : undefined,
          width: { ideal: 960 },
          height: { ideal: 540 },
          facingMode: "user",
        },
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const track = stream.getVideoTracks()[0];
  
      return track;
  
    } catch (error) {
      let friendlyMessage = "An unknown error occurred while accessing the webcam.";
  
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        friendlyMessage = "Webcam access was denied. Please enable it in your browser settings.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        friendlyMessage = "No webcam was found. Please connect one and try again.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        friendlyMessage = "Your webcam is currently being used by another application.";
      } else if (error.name === "OverconstrainedError") {
        friendlyMessage = `The selected webcam is not available or does not meet the required resolution.`;
      } else if (error.name === "SecurityError") {
        friendlyMessage = "Access to the webcam is not allowed due to insecure context (e.g., not HTTPS).";
      }
  
      return {
        error: true,
        errorMessage: friendlyMessage,
        rawError: error.message
      };
    }
  };
  