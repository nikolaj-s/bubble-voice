import { createSlice } from "@reduxjs/toolkit";
import { assignPermissionGroup } from "./Thunks/assignPermissionGroup";


const serverUsersSlice = createSlice({
    name: "serverUsersSlice",
    initialState: {
        loading: false,
        error: false,
        users: {},
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            if (action.payload.user_id) {
                state.users[action.payload.user_id] = action.payload;
            }
        },
        updateUser: (state, action) => {
            if (state.users[action.payload.user_id]) {

                state.users[action.payload.user_id] = {...state.users[action.payload.user_id], ...action.payload}
            
            }
        },
        updateUserStatus: (state, action) => {

            if (state.users[action.payload.user_id]) {
                state.users[action.payload.user_id].status = action.payload.status;
            }
            
        },
        updateUserChannelStatus: (state, action) => {
            if (state.users[action.payload.user_id]) {
                state.users[action.payload.user_id].channel_status = action.payload.channel_status;
            }
        },
        updateVoiceActivation: (state, action) => {
            if (state.users[action.payload.user_id]) {
                state.users[action.payload.user_id].voiceActive = action.payload.voiceActive;
            }
        },
        removeUser: (state, action) => {

        },
        removeServerGroupFromUsers: (state, action) => {
            for (const [key, value] of Object.entries(state.users)) {
                if (value.server_group === action.payload.old_server_group_id) {
                    state.users[key].server_group = action.payload.new_server_group_id;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(assignPermissionGroup.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(assignPermissionGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(assignPermissionGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export const {
    updateUserStatus, 
    addUser, 
    updateUser, 
    removeUser, 
    setUsers, 
    updateUserChannelStatus, 
    updateVoiceActivation, 
    removeServerGroupFromUsers
} = serverUsersSlice.actions;

export default serverUsersSlice.reducer;