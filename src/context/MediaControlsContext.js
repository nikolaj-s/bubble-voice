import React, { createContext, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toggleMicrophone, toggleAudioMute, toggleWebcam } from "../features/MediaControl/mediaControlSlice"; 
import { useSocket } from "./SocketContext";
// Import actions

const MediaControlsContext = createContext(null);

export const MediaControlsProvider = ({ children }) => {

    const dispatch = useDispatch();

    const socket = useSocket();

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
        if (!loading) dispatch(toggleMicrophone(!isMicrophoneMuted));
    };

    const handleToggleAudio = () => {
        if (!loading) dispatch(toggleAudioMute(!isAudioMuted));
    };

    const handleToggleWebcam = () => {
        if (!loading) dispatch(toggleWebcam(!isWebcamOn));
    };

    return (
        <MediaControlsContext.Provider
            value={{
                isMicrophoneMuted,
                isAudioMuted,
                isWebcamOn,
                isScreenSharing,
                webcamError,
                microphoneError,
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
