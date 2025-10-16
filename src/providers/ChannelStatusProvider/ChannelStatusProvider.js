
import { useEffect } from 'react';

import { useSocket } from '../../context/SocketContext';

import { useSelector } from 'react-redux';
import { useStreamPreviewUpdater } from '../../hooks/useStreamPreviewUpdater';

export const ChannelStatusProvider = ({children}) => {

    const socket = useSocket();

    const { isMicrophoneMuted, isAudioMuted, isWebcamOn } = useSelector(
        (state) => state.mediaControlSlice
    );

    const {isSharing, streamDetails} = useSelector(state => state.screenShareSlice);
    
    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const streamPreview = useSelector(state => state.streamPreviewSlice.preview);

    const streamColor = useSelector(state => state.streamPreviewSlice.color);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    // Emit user status when changes occur
    useEffect(() => {
        if (!socket) return;

        const updateStatus = () => {
            socket.emit("user updates channel status", { isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing: isSharing, streamDetails, streamPreview, streamColor, server_id, currentVoiceChannel});
        };

        updateStatus();

        socket.on("connect", updateStatus);

        return () => {

            socket.off("connect", updateStatus);
        };

    }, [isMicrophoneMuted, isAudioMuted, isWebcamOn, isSharing, socket, streamDetails, streamPreview, streamColor, server_id, currentVoiceChannel]);

    useEffect(() => {
        return () => {

            socket.emit("user updates channel status", { isMicrophoneMuted: null, isAudioMuted: null, isWebcamOn: null, isScreenSharing: null, streamDetails: null });

        }
    }, [socket])

    useStreamPreviewUpdater({user_id, isStreaming: isSharing});

    return (
        <>{children}</>
    )
}
