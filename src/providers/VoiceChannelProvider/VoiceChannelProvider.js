import { useDispatch, useSelector } from "react-redux";
import ErrorCard from "../../components/Error/ErrorCard/ErrorCard";

import { useSocket } from "../../context/SocketContext";

import React from 'react';
import { updateVoiceActivation } from "../../features/ServerUsers/serverUsersSlice";
import { clearVoiceChannelState } from "../../features/Channel/VoiceChannel/voiceChannelSlice";

export const VoiceChannelProvider = ({channel, children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const channelsStatus = useSelector(state => state.channelsSlice.status);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    React.useEffect(() => {

        if (!socket) return;

        if (!channel) return;

        if (!server_id) return;

        if (channelsStatus !== 'complete') return;

        const handleJoinChannel = async () => {

            toggleLoading(true);

            await socket.request('join channel', {channel_id: channel, server_id})
            .then(res => {

                toggleError(false);

                return;

            })
            .catch(error => {

                toggleError(error);

                return;
            })

            toggleLoading(false);

            return;
        }

        const handleVoiceActivation = (data) => {

            if (data.user_id) {
                dispatch(updateVoiceActivation(data));
            }
        }

        socket.on('voice activation', handleVoiceActivation);

        socket.on('connect', handleJoinChannel);

        handleJoinChannel();

        return () => {

            socket.emit('leave channel');

            socket.off('connect', handleJoinChannel);

            socket.off('voice activation', handleVoiceActivation);

            dispatch(clearVoiceChannelState());

        }

    }, [socket, channel, dispatch, channelsStatus, server_id]);

    if (loading || channelsStatus !== 'complete') return <></>

    if (error) return <ErrorCard message={error} />

    return (
        <>
        {children}
        </>
    )
}

