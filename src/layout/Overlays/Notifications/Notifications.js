import React from 'react'
import { QuickMenuWrapper } from '../../../components/ui/Wrappers/QuickMenuWrapper/QuickMenuWrapper'
import Label from '../../../components/ui/Titles/Label/Label'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNotificationPanel } from '../../../features/Notifications/notificationsSlice';

import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';

import styles from './Notifications.module.css'
import StickyWrapper from '../../../components/ui/Wrappers/StickyWrapper/StickyWrapper';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { Bell, X } from 'lucide-react';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';


export const Notifications = () => {

    const dispatch = useDispatch();

    const open = useSelector(state => state.notificationsSlice.notificationPanelOpen);

    const notifications = useSelector(state => state.notificationsSlice.notifications);


    if (!open) return null;

    return (
    <QuickMenuWrapper close={() => {dispatch(toggleNotificationPanel())}} top={40} right={20} bottom={0} left={null}>
        <ScrollLoadWrapper>
            <StickyWrapper className={styles.header}>
                <Label label='Your Notifications' />
                <IconButton Icon={<X color='var(--text-color)' />} title={'Close'} onClick={() => {dispatch(toggleNotificationPanel())}} />
            </StickyWrapper>
            {notifications?.length === 0 && (<ContentPlaceholder icon={Bell} title={"No Notifications"} message={'You are all caught up'} />)}

        </ScrollLoadWrapper>
    </QuickMenuWrapper>
    )
}
