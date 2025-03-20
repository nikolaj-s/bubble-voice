import { createSlice } from "@reduxjs/toolkit";


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
            
        },
        updateUser: (state, action) => {
            if (state.users[action.payload.user_id]) {

                state.users[action.payload.user_id] = action.payload;
            
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

        }
    }
})

export const {updateUserStatus, addUser, updateUser, removeUser, setUsers, updateUserChannelStatus, updateVoiceActivation} = serverUsersSlice.actions;

export default serverUsersSlice.reducer;