import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../context/SocketContext';
import { fetchLastReadStatus } from '../../features/Notifications/Thunks/fetchLastReadStatus';
import { updateLatestMessageAt } from '../../features/Channel/Channels/channelsSlice';
import { toggleNewMessageStatus } from '../../features/Servers/serversSlice';
import Toaster from '../../components/Toaster/Toaster';
import { useNotify } from '../../hooks/useNotify';
import { fetchNotifications } from '../../features/Notifications/Thunks/fetchNotifications';
import { pushNotification } from '../../features/Notifications/notificationsSlice';
import { playSoundEffect } from '../../features/SoundEffects/soundEffectsSlice';

export const NotificationProvider = ({children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const {channels} = useSelector(state => state.channelsSlice);

    const {last_read_status, muteNotifications} = useSelector(state => state.notificationsSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    

    const muted_notifications = useSelector(state => state.accountPreferencesSlice.muted_notifications) || {muted_notifications: {}};

    const {notify} = useNotify();

    React.useEffect(() => {

        dispatch(fetchLastReadStatus());

    }, [dispatch]);

    // inside your component…
    const serverIdRef = useRef(server_id);
    const currentChannelRef = useRef(currentTextChannel);
    const notificationPrefRef = useRef(muted_notifications);
    const mutedNotificationRef = useRef(muteNotifications);

    // keep the refs up-to-date
    useEffect(() => { serverIdRef.current       = server_id      }, [server_id]);
    useEffect(() => { currentChannelRef.current = currentTextChannel }, [currentTextChannel]);
    useEffect(() => {notificationPrefRef.current = muted_notifications}, [muted_notifications]);
    useEffect(() => {mutedNotificationRef.current = muteNotifications}, [muteNotifications]);

    // now define a stable handler that only depends on dispatch
    const handleUpdateLatestMessage = useCallback((data) => {
        dispatch(updateLatestMessageAt(data))

        // read the *current* values out of the refs
        if (currentChannelRef.current !== data.channel_id && serverIdRef.current === data.server_id && !notificationPrefRef.current[serverIdRef.current]) {
            notify(data)
        }

        if (serverIdRef.current !== data.server_id) {
            dispatch(toggleNewMessageStatus({ ...data, unread_message: true }))
        }
    }, [dispatch])

    const handlePushNotification = (data) => {

        dispatch(pushNotification(data));

        if (notificationPrefRef.current[data.server_id] || mutedNotificationRef.current) return;

        dispatch(playSoundEffect('newMessage'));
    
    }

    useEffect(() => {
        if (!socket) return

        const handleFetchNotifications = () => dispatch(fetchNotifications());

        // these functions never change, so this effect only runs once
        socket.on('new notification', handlePushNotification);

        socket.on('update latest message', handleUpdateLatestMessage);

        socket.on('connect', handleFetchNotifications);

        handleFetchNotifications()

        return () => {
            socket.off('new notification', handlePushNotification);

            socket.off('update latest message', handleUpdateLatestMessage);

            socket.off('connect', handleFetchNotifications);

        }
    }, [socket, dispatch, handleUpdateLatestMessage])

    React.useEffect(() => {
        
        if (!channels || !last_read_status) return;

        const hasUnread = Object.values(channels).some(channel => {
            if (channel.channel_type !== 'text' || channel.locked_channel) return false;

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
