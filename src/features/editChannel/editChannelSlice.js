import { updateChannel } from "./Thunks/updateChannel";

const { createSlice } = require("@reduxjs/toolkit");


const editChannelSlice = createSlice({
    name: "editChannelSlice",
    initialState: {
        loading: false,
        selectedChannel: {},
        error: false,
        authorized: false
    },
    reducers: {
        setChannelToEdit: (state, action) => {
            state.selectedChannel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateChannel.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(updateChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updateChannel.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.channel_id) {
                state.selectedChannel = action.payload;
            } else {
                state.error = "Unexpected Error Occurred"
            }
        })
    }
})

export const {setChannelToEdit} = editChannelSlice.actions;

export default editChannelSlice.reducer;