import { Trash2 } from 'lucide-react';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { BoolIndicator } from '../../../components/ui/BoolIndicator/BoolIndicator';
import { setServerToLeave } from '../../../features/LeaveServer/leaveServerSlice';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { removeNotificationMute, setNotificationMute } from '../../../features/AccountPreferences/accountPreferencesSlice';
import { updateAccountPreferences } from '../../../features/AccountPreferences/Thunks/updateAccountPreferences';

export const useServerCtxMenu = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const muted_notifications = useSelector(state => state.accountPreferencesSlice.muted_notifications) || {muted_notifications: {}};

    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const getServerOptions = useCallback((options, server) => {

        options.push({
            type: 'button',
            icon: <BoolIndicator active={muted_notifications[server._id]} />,
            onClick: () => {
                if (muted_notifications[server._id]) {
                    dispatch(removeNotificationMute(server._id));
                } else {
                    dispatch(setNotificationMute({key: server._id, value: {type: 'server'}}))
                }

                dispatch(updateAccountPreferences());
            },
            label: "Mute Notifications"
        })

        if (server.server_owner !== user_id) {
            options.push({
                type: 'button',
                label: `Leave ${server.server_name}`,
                onClick: () => {
                    dispatch(setOverlay('leaveServer'));
                    dispatch(setServerToLeave(server));
                },
                color: 'var(--error-color)'
            })
        } else if (server.server_owner === user_id) {
            options.push({
                type: 'button',
                label: `Delete ${server.server_name}`,
                onClick: () => {

                },
                color: 'var(--error-color)',
                icon: <Trash2 color='var(--error-color)' />
            })
        }

    })

    return {getServerOptions}
}
