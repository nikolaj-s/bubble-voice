import React from 'react'
import { QuickMenuWrapper } from '../../../components/ui/Wrappers/QuickMenuWrapper/QuickMenuWrapper'
import Label from '../../../components/ui/Titles/Label/Label'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification, toggleNotificationPanel } from '../../../features/Notifications/notificationsSlice';

import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';

import styles from './Notifications.module.css'
import StickyWrapper from '../../../components/ui/Wrappers/StickyWrapper/StickyWrapper';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { Bell, X } from 'lucide-react';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import NotificationItem from './NotificationItems/NotificationItem';
import { markNotificationsRead } from '../../../features/Notifications/Thunks/markNotificationsRead';
import { useNavigate } from 'react-router';
import { deleteNotification } from '../../../features/Notifications/Thunks/deleteNotification';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';
import { JoinServer } from '../../../features/JoinServer/Thunks/JoinServer';
import { isValidObjectId } from '../../../lib/services/helperFunctions';
import { triggerAlert } from '../../../features/Alerts/alertsSlice';
import { createConversation } from '../../../features/Conversations/Thunks/createConversation';

export const Notifications = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const open = useSelector(state => state.notificationsSlice.notificationPanelOpen);

    const {notifications, notification_count, error} = useSelector(state => state.notificationsSlice);

    React.useEffect(() => {

        if (notification_count === 0) return;

        if (open) {
            dispatch(markNotificationsRead());
        }

    }, [open, dispatch , notification_count]);

    const handleOpenNotification = (data) => {

        if (data.type === 'reply') {
            navigate(`/dashboard/server/${data.server_id._id}/channel/${data.channel_id._id}?message=${data.message_id}`);

            dispatch(deleteNotification(data._id));
        }

        if (data.type === 'server_invite') {
            if (data.accepted) {

                dispatch(JoinServer({inviteKey: data._id, navigate}));

                dispatch(removeNotification(data._id));

            } else {
                dispatch(deleteNotification(data._id));
            }
        
        }

        if (data.type === 'channel_invite') {
            if (data.accepted) {
                
                const server_id = data.server_id._id;

                const channel_id = data.channel_id._id;

                if (isValidObjectId(server_id) && isValidObjectId(channel_id)) {

                    navigate(`/dashboard/server/${server_id}?voice-channel=${channel_id}`);

                } else {
                    dispatch(triggerAlert("Unexpected Error Accepting Invite", 'error'))
                }
            }

            dispatch(deleteNotification(data._id));
        }

        if (data.type === 'poke') {

            if (data.sender_id) {

                dispatch(createConversation(data.sender_id._id));

            }

            dispatch(deleteNotification(data._id));

        }

        dispatch(toggleNotificationPanel());

    }

    const onDelete = (data) => {
        if (!data._id) return;

        dispatch(deleteNotification(data._id));
    }

    if (!open) return null;

    return (
    <QuickMenuWrapper close={() => {dispatch(toggleNotificationPanel())}} top={window?.electron ? 80 : 40} right={20} bottom={0} left={null}>
        <ScrollLoadWrapper>
            {error && (<TextLabelError error={error} />)}
            <StickyWrapper className={styles.header}>
                <Label label='Your Notifications' />
                <IconButton Icon={<X color='var(--text-color)' />} title={'Close'} onClick={() => {dispatch(toggleNotificationPanel())}} />
            </StickyWrapper>
            {notifications?.length === 0 && (<ContentPlaceholder icon={Bell} title={"No Notifications"} message={'You are all caught up'} />)}
            {notifications.map(notifcation => (<NotificationItem notification={notifcation} onClick={handleOpenNotification} onDelete={onDelete} />))}
        </ScrollLoadWrapper>
    </QuickMenuWrapper>
    )
}
