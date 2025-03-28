
import React from "react";

import { useDispatch } from "react-redux";

import { useSocket } from "../../context/SocketContext"
import { fetchMessages } from "../../features/TextChannel/Thunks/fetchMessages";
import { addMessage, clearTextChannelState, removeMessage, setCurrentTextChannel } from "../../features/TextChannel/textChannelSlice";

export const TextChannelProvider = ({children, channel}) => {

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

        const handleFetchMessages = () => {

            dispatch(fetchMessages({channel_id: channel}));

        }

        const handleNewMessage = (data) => {

            dispatch(addMessage(data));

        }

        const handleDeleteMessage = (data) => {
            dispatch(removeMessage(data));
        }

        socket.on('connect', handleFetchMessages);

        socket.on(`new message to ${channel}`, handleNewMessage);

        socket.on(`delete message in ${channel}`, handleDeleteMessage);

        handleFetchMessages();

        return () => {

            socket.off('connect', handleFetchMessages);

            socket.off(`new message to ${channel}`, handleNewMessage);

            socket.off(`delete message in ${channel}`, handleDeleteMessage);
            
        }


    }, [channel, socket, dispatch])

    return (
        <>
        {children}
        </>
    )
}