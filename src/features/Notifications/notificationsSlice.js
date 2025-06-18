import { createSlice } from "@reduxjs/toolkit";
import { fetchLastReadStatus } from "./Thunks/fetchLastReadStatus";
import { updateLastReadStatus } from "./Thunks/updateLastReadStatus";


const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState: {
        loading: false,
        error: false,
        notificationPanelOpen: false,
        last_read_status: {},
        notifications: [],
        notifications_overlay: []
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
        }
    },
    extraReducers: (builder) => {
        // fetch last read status
        builder.addCase(fetchLastReadStatus.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchLastReadStatus.fulfilled, (state, action) => {
            state.last_read_status = action.payload;
            state.loading = false;
            state.error = false;
        })
        builder.addCase(fetchLastReadStatus.rejected, (state, action) => {
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
    }
})

export const {setLastReadStatus, pushNotificationOverlay, removeNotificationOverlay, toggleNotificationPanel} = notificationsSlice.actions;

export default notificationsSlice.reducer;