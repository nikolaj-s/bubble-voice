

export const getMicrophoneMedia = async (device_id, echoCancellation = false, autoGainControl) => {
    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: device_id ? {exact: device_id} : undefined,
                echoCancellation,
                autoGainControl,
            }
        })

        const track = stream.getAudioTracks()[0];

        return track;
    } catch (error) {
        return {error: true, errorMessage: error.message}
    }
}

export const getWebcamMedia = async (device_id) => {
    try {

        const constraints = {
            video: {
                deviceId: device_id ? {exact: device_id} : undefined,
                width: { ideal: 960 }, // Width for 540p (960px)
                height: { ideal: 540 }, // Height for 540p (540px)
                facingMode: "user", // Optional: To ensure the front camera is used
            },
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          const track = stream.getVideoTracks()[0];

          return track;
    } catch (error) {
        console.log(error);
        return {error: true, errorMessage: error.message}
    }
}