
import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useSocket } from "../../context/SocketContext"
import { fetchMessages } from "../../features/Channel/TextChannel/Thunks/fetchMessages";
import { addMessage, clearTextChannelState, removeMessage, setCurrentTextChannel, updateMessage } from "../../features/Channel/TextChannel/textChannelSlice";

export const TextChannelProvider = ({children, channel}) => {

    const { server_id } = useSelector(state => state.serverDetailsSlice);

    const dispatch = useDispatch();

    const socket = useSocket();
   
    React.useEffect(() => {

        dispatch(setCurrentTextChannel(channel));

        return () => {

            dispatch(clearTextChannelState())
        
        }

    }, [channel, dispatch])

    React.useEffect(() => {

        if (!channel) return;

        if (!socket) return;

        if (!server_id) return;

        const handleFetchMessages = () => {

            dispatch(fetchMessages({channel_id: channel, server_id}));

        }

        const handleNewMessage = (data) => {

            dispatch(addMessage(data));

        }

        const handleDeleteMessage = (data) => {
            dispatch(removeMessage(data));
        }

        const handleUpdateMessage = (data) => {
            dispatch(updateMessage(data));
        }

        socket.on('connect', handleFetchMessages);

        socket.on(`new message to ${channel}`, handleNewMessage);

        socket.on(`delete message in ${channel}`, handleDeleteMessage);

        socket.on(`update message in ${channel}`, handleUpdateMessage);

        handleFetchMessages();

        return () => {

            socket.off('connect', handleFetchMessages);

            socket.off(`new message to ${channel}`, handleNewMessage);

            socket.off(`delete message in ${channel}`, handleDeleteMessage);

            socket.off(`update message in ${channel}`, handleUpdateMessage);
            
            dispatch(setCurrentTextChannel(null));
        }


    }, [channel, socket, dispatch, server_id])

    return (
        <>
        {children}
        </>
    )
}