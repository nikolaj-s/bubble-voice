

export const getMicrophoneMedia = async (device_id, echoCancellation = false, autoGainControl, noiseSuppression) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: device_id ? { exact: device_id } : undefined,
          echoCancellation,
          autoGainControl,
          noiseSuppression
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
    const buildConstraints = (id) => ({
      video: {
        deviceId: id ? { exact: id } : undefined,
        width: { ideal: 960 },
        height: { ideal: 540 },
        facingMode: "user",
      },
    });
  
    const getFriendlyError = (error) => {
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        return "Webcam access was denied. Please enable it in your browser settings.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        return "No webcam was found. Please connect one and try again.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        return "Your webcam is currently being used by another application.";
      } else if (error.name === "OverconstrainedError") {
        return "The selected webcam is not available or does not meet the required resolution.";
      } else if (error.name === "SecurityError") {
        return "Access to the webcam is not allowed due to insecure context (e.g., not HTTPS).";
      }
      return "An unknown error occurred while accessing the webcam.";
    };
  
    try {
      // Try using selected device ID
      const stream = await navigator.mediaDevices.getUserMedia(buildConstraints(device_id));
      return stream.getVideoTracks()[0];
    } catch (error) {
      // If error is OverconstrainedError or NotFoundError, try fallback
      if (["OverconstrainedError", "NotFoundError", "DevicesNotFoundError"].includes(error.name)) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const webcams = devices.filter(d => d.kind === "videoinput");
  
          if (webcams.length === 0) {
            throw new Error("No webcam found");
          }
  
          const fallbackId = webcams[0].deviceId;
          const fallbackStream = await navigator.mediaDevices.getUserMedia(buildConstraints(fallbackId));
          return fallbackStream.getVideoTracks()[0];
        } catch (fallbackError) {
          return {
            error: true,
            errorMessage: getFriendlyError(fallbackError),
            rawError: fallbackError.message
          };
        }
      }
  
      return {
        error: true,
        errorMessage: getFriendlyError(error),
        rawError: error.message
      };
    }
  };
  
  