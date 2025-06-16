import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../context/SocketContext';
import { fetchLastReadStatus } from '../../features/Notifications/Thunks/fetchLastReadStatus';
import { updateLatestMessageAt } from '../../features/Channel/Channels/channelsSlice';
import { toggleNewMessageStatus } from '../../features/Servers/serversSlice';
import Toaster from '../../components/Toaster/Toaster';
import { useNotify } from '../../hooks/useNotify';

export const NotificationProvider = ({children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const {channels} = useSelector(state => state.channelsSlice);

    const {last_read_status} = useSelector(state => state.notificationsSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {notify} = useNotify();

    React.useEffect(() => {

        dispatch(fetchLastReadStatus());

    }, [dispatch]);

    const handleUpdateLatestMessage = useCallback((data) => {

        dispatch(updateLatestMessageAt(data));
        console.log(server_id, data.server_id, currentTextChannel)
        if (currentTextChannel !== data.channel_id && server_id === data.server_id) {
            notify(data);
        }

        if (server_id !== data.server_id) {
            console.log(data)
            dispatch(toggleNewMessageStatus({...data, unread_message: true}));
        }
    // eslint-disable-next-line
    }, [dispatch, server_id, currentTextChannel])

    React.useEffect(() => {

        if (!socket) return;
        
        socket.on(`update latest message`, handleUpdateLatestMessage);

        return () => {
            socket.off(`update latest message`, handleUpdateLatestMessage);
        }
        
    //eslint-disable-next-line
    }, [socket, dispatch, handleUpdateLatestMessage])

    React.useEffect(() => {
        
        if (!channels || !last_read_status) return;

        const hasUnread = Object.values(channels).some(channel => {
            if (channel.channel_type !== 'text') return false;

            const lastRead = last_read_status[channel._id]?.last_read_at;
            const latestMessage = channel.latest_message_at;

            return latestMessage && (!lastRead || new Date(latestMessage) > new Date(lastRead));
        });

        dispatch(toggleNewMessageStatus({ server_id, unread_message: hasUnread }));

    }, [channels, last_read_status, server_id, dispatch]);

    return (
        <>
        {children}
        <Toaster />
        </>
    )
}
