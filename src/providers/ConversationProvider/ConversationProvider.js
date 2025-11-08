
import React, { useRef } from 'react'
import { useSocket } from '../../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations } from '../../features/Conversations/Thunks/fetchConversations';
import { addConversationMessage, removeConversationMessage, setCurrentConversation, updateConversationMessage } from '../../features/Conversations/conversationSlice';
import { removeConversation, toggleUnreadConversations, updateConversationTimeStamp } from '../../features/Conversations/conversationsSlice';
import { playSoundEffect } from '../../features/SoundEffects/soundEffectsSlice';

export const ConversationProvider = () => {

    const dispatch = useDispatch();

    const {conversations, isOpen} = useSelector(state => state.conversationsSlice);

    const currentConversation = useSelector(state => state.conversationSlice.selectedConversation);

    const {muteNotifications} = useSelector(state => state.notificationsSlice);

    const socket = useSocket();

    const conversationRef = useRef();

    const currentConversationRef = useRef();

    const notificationsMutedRef = useRef(muteNotifications);

    const conversationsOpenRef = useRef();

    React.useEffect(() => {notificationsMutedRef.current = muteNotifications}, [muteNotifications]);

    React.useEffect(() => {currentConversationRef.current = currentConversation}, [currentConversation]);

    React.useEffect(() => {conversationsOpenRef.current = isOpen}, [isOpen]);

    React.useEffect(() => {
        conversationRef.current = conversations;
    }, [conversations])

    React.useEffect(() => {

        if (!socket) return;

        const handleFetchConversations = () => dispatch(fetchConversations());

        const handleConversationMessage = (message) => {

            if (!conversationRef.current.find(convo => convo._id === message.conversation_id)) handleFetchConversations();

            dispatch(addConversationMessage(message));

            dispatch(updateConversationTimeStamp(message));

            if (currentConversationRef?.current?._id !== message.conversation_id || !conversationsOpenRef.current) {

                if (!notificationsMutedRef.current) dispatch(playSoundEffect('newMessage'));
           
                dispatch(toggleUnreadConversations(true));
            }

        };

        const handleRemoveConverstation = data => {
            dispatch(removeConversation(data));

            if (data.conversation_id === currentConversationRef.current?._id) {
                dispatch(setCurrentConversation(null));
            }
        };

        const handleRemoveConversationMessage = message => dispatch(removeConversationMessage(message));

        const handleUpdateConversationMessage = message => dispatch(updateConversationMessage(message));

        socket.on('connect', handleFetchConversations);

        socket.on('conversation message', handleConversationMessage);

        socket.on('delete conversation message', handleRemoveConversationMessage);

        socket.on('update conversation message', handleUpdateConversationMessage);

        socket.on('delete conversation', handleRemoveConverstation);

        handleFetchConversations();

        return () => {

            socket.off('connect', handleFetchConversations);

            socket.off('conversation message', handleConversationMessage);

            socket.off('delete conversation message', handleRemoveConversationMessage);

            socket.off('update conversation message', handleUpdateConversationMessage);

            socket.off('delete conversation', handleRemoveConverstation);
        }

    }, [dispatch, socket])

    return (
        <>
        </>
    )
}
