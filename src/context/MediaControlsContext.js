import { createContext, useContext, } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toggleMicrophone, toggleAudioMute, toggleWebcam, toggleScreenShare } from "../features/Channel/MediaControl/mediaControlSlice"; 
import { useBubbleSounds } from "../hooks/useBubbleSounds";

const MediaControlsContext = createContext(null);

export const MediaControlsProvider = ({ children }) => {

    const dispatch = useDispatch();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const details = useSelector(state => state.channelsSlice.channels[currentVoiceChannel]);

    const {playEnable, playDisable} = useBubbleSounds();

    // Get state from Redux
    const { loading } = useSelector((state) => state.accountSlice);

    const { isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing, microphoneError, webcamError, screenShareError } = useSelector(
        (state) => state.mediaControlSlice
    );

    const {isSharing} = useSelector(state => state.screenShareSlice);

    // Actions
    const handleToggleMicrophone = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleMicrophone(!isMicrophoneMuted));
        (isMicrophoneMuted ? playEnable : playDisable)();
    };

    const handleToggleAudio = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleAudioMute(!isAudioMuted));
        (isAudioMuted ? playEnable : playDisable)()
    };

    const handleToggleWebcam = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleWebcam(!isWebcamOn));
        (isWebcamOn ? playDisable : playEnable)();
    };

    const handleShareScreen = () => {
        if (details?.disable_streams) return;
        if (!loading) dispatch(toggleScreenShare(!isScreenSharing));
        (isScreenSharing ? playDisable : playEnable)();
    }

    return (
        <MediaControlsContext.Provider
            value={{
                isMicrophoneMuted,
                isAudioMuted,
                isWebcamOn,
                isScreenSharing,
                isSharing,
                webcamError: details?.disable_streams ? 'Streams Are Disabled In This Channel' : webcamError,
                audioError: details?.disable_streams ? "Streams Are Disabled In This Channel" : null,
                microphoneError: details?.disable_streams ? "Streams Are Disabled In This Channel" : microphoneError,
                screenShareError: details?.disable_streams ? "Streams Are Disabled In This Channel" :  screenShareError,
                handleToggleMicrophone,
                handleToggleAudio,
                handleToggleWebcam,
                handleShareScreen
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
