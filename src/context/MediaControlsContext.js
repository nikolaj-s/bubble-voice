import React, { createContext, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toggleMicrophone, toggleAudioMute, toggleWebcam } from "../features/Channel/MediaControl/mediaControlSlice"; 
import { useSocket } from "./SocketContext";
// Import actions

const MediaControlsContext = createContext(null);

export const MediaControlsProvider = ({ children }) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const details = useSelector(state => state.channelsSlice.channels[currentVoiceChannel]);

    // Get state from Redux
    const { loading } = useSelector((state) => state.accountSlice);

    const { isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing, microphoneError, webcamError } = useSelector(
        (state) => state.mediaControlSlice
    );

    // Emit user status when changes occur
    useEffect(() => {
        if (!socket) return;

        const updateStatus = () => {
            socket.emit("user updates channel status", { isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing });
        };

        updateStatus();

        socket.on("connect", updateStatus);

        return () => {
            socket.off("connect", updateStatus);
        };

    }, [isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing, socket]);

    // Actions
    const handleToggleMicrophone = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleMicrophone(!isMicrophoneMuted));
    };

    const handleToggleAudio = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleAudioMute(!isAudioMuted));
    };

    const handleToggleWebcam = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleWebcam(!isWebcamOn));
    };

    return (
        <MediaControlsContext.Provider
            value={{
                isMicrophoneMuted,
                isAudioMuted,
                isWebcamOn,
                isScreenSharing,
                webcamError: details?.disable_streams ? 'Streams Are Disabled In This Channel' : webcamError,
                audioError: details?.disable_streams ? "Streams Are Disabled In This Channel" : null,
                microphoneError: details?.disable_streams ? "Streams Are Disabled In This Channel" : microphoneError,
                handleToggleMicrophone,
                handleToggleAudio,
                handleToggleWebcam,
            }}
        >
            {children}
        </MediaControlsContext.Provider>
    );
};

// Hook to use media controls
export const useMediaControls = () => {
    const context = useContext(MediaControlsContext);
    if (!context) {
        throw new Error("useMediaControls must be used within a MediaControlsProvider");
    }
    return context;
};
