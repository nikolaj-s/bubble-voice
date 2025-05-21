import { createSlice } from "@reduxjs/toolkit";
import { fetchLastReadStatus } from "./Thunks/fetchLastReadStatus";
import { updateLastReadStatus } from "./Thunks/updateLastReadStatus";


const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState: {
        loading: false,
        error: false,
        last_read_status: {},
    },
    reducers: {
        setLastReadStatus: (state, action) => {
            state.last_read_status[action.payload] = {...state.last_read_status[action.payload], last_read_at: String(new Date())}
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
            console.log(action.payload);
            state.loading = false;
            if (action.payload.channel_id) {
                state.last_read_status[action.payload.channel_id] = action.payload;
            }
        })
    }
})

export const {setLastReadStatus} = notificationsSlice.actions;

export default notificationsSlice.reducer;