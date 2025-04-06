import { useDispatch, useSelector } from "react-redux";
import ErrorCard from "../../components/Error/ErrorCard/ErrorCard";

import { useSocket } from "../../context/SocketContext";

import React from 'react';
import { updateVoiceActivation } from "../../features/ServerUsers/serverUsersSlice";

export const VoiceChannelProvider = ({channel, children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const [loading, toggleLoading] = React.useState(true);

    const [error, toggleError] = React.useState(false);

    const channelsStatus = useSelector(state => state.channelsSlice.status)

    React.useEffect(() => {

        if (!socket) return;

        if (!channel?.channel_id) return;

        if (channelsStatus !== 'complete') return;
 
        if (channel?.channel_type !== 'voice') return toggleError("Invalid Channel Error");

        const handleJoinChannel = async () => {

            toggleLoading(true);

            await socket.request('join channel', channel)
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

        }

    }, [socket, channel?.channel_id, dispatch, channelsStatus]);

    if (loading) return <></>

    if (error) return <ErrorCard message={error} />

    return (
        <>
        {children}
        </>
    )
}

