import { createSlice } from "@reduxjs/toolkit";
import { fetchLastReadStatus } from "./Thunks/fetchLastReadStatus";
import { updateLastReadStatus } from "./Thunks/updateLastReadStatus";
import { fetchNotifications } from "./Thunks/fetchNotifications";
import { markNotificationsRead } from "./Thunks/markNotificationsRead";
import { deleteNotification } from "./Thunks/deleteNotification";
import { clearNotifcations } from "./Thunks/clearNotifications";

const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState: {
        loading: false,
        error: false,
        notificationPanelOpen: false,
        last_read_status: {},
        notifications: [],
        notification_count: 0,
        notifications_overlay: [],
        noMoreNotifications: false
    },
    reducers: {
        toggleNotificationPanel: (state, action) => {
            state.notificationPanelOpen = !state.notificationPanelOpen;
        },
        setLastReadStatus: (state, action) => {
            state.last_read_status[action.payload] = {
            ...state.last_read_status[action.payload],
            last_read_at: String(new Date())
            };
        },

        pushNotificationOverlay: (state, action) => {
            const notification = {
            id: Date.now(), // unique id
            ...action.payload
            };

            // Keep only the most recent 2 if already at max
            if (state.notifications_overlay.length >= 3) {
            state.notifications_overlay.shift(); // remove the oldest
            }

            state.notifications_overlay.push(notification);
        },

        removeNotificationOverlay: (state, action) => {
            state.notifications_overlay = state.notifications_overlay.filter(
            (n) => n.id !== action.payload
            );
        },
        pushNotification: (state, action) => {
            console.log(action.payload)
            state.notifications.unshift(action.payload);
            state.notification_count += 1;
        },

    },
    extraReducers: (builder) => {
        // fetch last read status
        builder.addCase(fetchLastReadStatus.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchLastReadStatus.fulfilled, (state, action) => {
            state.last_read_status = action.payload;
            state.loading = false;
            state.error = false;
        })
        .addCase(fetchLastReadStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // update last read status
        builder.addCase(updateLastReadStatus.fulfilled, (state, action) => {

            state.loading = false;
            if (action.payload.channel_id) {
                state.last_read_status[action.payload.channel_id] = action.payload;
            }
        })

        // fetch notifications
        builder.addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchNotifications.fulfilled, (state, action) => {

            const { list, unreadCount } = action.payload;

            const skip = action.meta.arg?.skip || 0;

            if (skip === 0) {
                // First page or refresh: replace notifications
                state.notifications = list
            } else {
                // Append new items, preventing duplicates
                const existingIds = new Set(state.notifications.map(n => n._id))
                const newItems = list.filter(n => !existingIds.has(n._id))
                state.notifications.push(...newItems)
            }

            state.notification_count = unreadCount;

            if (!action.payload.hasMore) {
                state.noMoreNotifications = true;
            }

        })

        // mark notification read

        builder.addCase(markNotificationsRead.fulfilled, (state) => {
            state.notifications = state.notifications.map(notification => ({...notification, read: true}))
            state.notification_count = 0;
        })

        // delete notification
        builder.addCase(deleteNotification.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteNotification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteNotification.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            if (action.payload.notification_id) {
                state.notifications = state.notifications.filter(n => n._id !== action.payload.notification_id);
            }
        })

        // clear notifications
        builder.addCase(clearNotifcations.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(clearNotifcations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearNotifcations.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.notifications = [];
            state.notification_count = 0;
        })
    }
})

export const {setLastReadStatus, pushNotificationOverlay, removeNotificationOverlay, toggleNotificationPanel, pushNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;