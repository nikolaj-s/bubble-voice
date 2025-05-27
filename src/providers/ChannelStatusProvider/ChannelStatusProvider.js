
import { useEffect } from 'react';

import { useSocket } from '../../context/SocketContext';

import { useSelector } from 'react-redux';

export const ChannelStatusProvider = ({children}) => {

    const socket = useSocket();

    const { isMicrophoneMuted, isAudioMuted, isWebcamOn } = useSelector(
        (state) => state.mediaControlSlice
    );

    const {isSharing, streamDetails} = useSelector(state => state.screenShareSlice);
    
    // Emit user status when changes occur
    useEffect(() => {
        if (!socket) return;
        console.log(streamDetails)
        const updateStatus = () => {
            socket.emit("user updates channel status", { isMicrophoneMuted, isAudioMuted, isWebcamOn, isScreenSharing: isSharing, streamDetails });
        };

        updateStatus();

        socket.on("connect", updateStatus);

        return () => {

            socket.off("connect", updateStatus);
        };

    }, [isMicrophoneMuted, isAudioMuted, isWebcamOn, isSharing, socket, streamDetails]);

    useEffect(() => {
        return () => {

            socket.emit("user updates channel status", { isMicrophoneMuted: null, isAudioMuted: null, isWebcamOn: null, isScreenSharing: null, streamDetails: null });

        }
    }, [socket])

    return (
        <>{children}</>
    )
}
