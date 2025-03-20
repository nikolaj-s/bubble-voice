

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

