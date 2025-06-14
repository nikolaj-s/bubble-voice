import React from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../context/SocketContext';
import { fetchLastReadStatus } from '../../features/Notifications/Thunks/fetchLastReadStatus';
import { updateLatestMessageAt } from '../../features/Channel/Channels/channelsSlice';

export const NotificationProvider = ({children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    React.useEffect(() => {

        dispatch(fetchLastReadStatus());

    }, [dispatch]);

    React.useEffect(() => {

        if (!socket) return;

        const handleUpdateLatestMessage = data => dispatch(updateLatestMessageAt(data));
        
        socket.on(`update latest message`, handleUpdateLatestMessage);

        return () => {
            socket.off(`update latest message`, handleUpdateLatestMessage);
        }

    }, [socket, dispatch])

    return (
        <>
        {children}
        </>
    )
}
