import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSavedLocalData, saveLocalData } from "../../../../util/LocalData";
import { socket } from "../../ServerBar/ServerBar";
import { updateMemberActiveStatus } from "../../ServerSlice";

export const updateUserStatus = createAsyncThunk(
    'UserStatusSlice/updateUserStatus',
    async (status, {rejectWithValue, dispatch}) => {
        try {
            if (socket) {

                const data = await socket.request('update status', status)
                .then(res => {
                    console.log(res)
                    return res;
                })
                .catch(err => {
                    return rejectWithValue({error: true});
                })

                dispatch(updateMemberActiveStatus(data));

                return status;

            } else {
                return rejectWithValue({error: true})
            }
            
        } catch (error) {
            return rejectWithValue({error: true})
        }
    }
)

export const fetchSavedCustomStatus = createAsyncThunk(
    'UserStatusSlice/fetchSavedCustomStatus',
    async (_, {rejectWithValue}) => {
        try {

            const data = await fetchSavedLocalData("USERSTATUS", "CUSTOM");

            if (data) {
                return data
            } else {
                return {custom_status: "", current_status: {state: 'online', value: 'Online'}}
            }

        } catch (error) {
            return rejectWithValue({error: true});
        }
    }
)

const UserStatusSlice = createSlice({
    name: "UserStatusSlice",
    initialState: {
        onlineUsers: [],
        offlineUsers: [],
        currentStatus: 'online',
        statusMenuOpen: false,
        customStatus: "",
        loading: false,
    },
    reducers: {
        setUsers: (state, action) => {

            state.onlineUsers = [];

            state.offlineUsers = [];

            const users = action.payload;

            for (const u of users) {
                if (u.status && u.status !== 'offline') {
                    state.onlineUsers.push(u)
                } else {
                    state.offlineUsers.push(u)
                }
            }
        },
        toggleStatusMenu: (state, action) => {
            state.statusMenuOpen = action.payload;
        },
        setCustomState: (state, action) => {
            state.customStatus = action.payload;

            saveLocalData("USERSTATUS", "CUSTOM", {custom_status: state.customStatus, current_status: state.currentStatus});
        },

    },
    extraReducers: {
        [fetchSavedCustomStatus.fulfilled]: (state, action) => {
            state.customStatus = action.payload.custom_status;

            state.currentStatus = action.payload.current_status ? action.payload.current_status : 'online';
        },
        [updateUserStatus.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUserStatus.fulfilled]: (state, action) => {
            state.loading = false;

            state.currentStatus = action.payload.value;

            saveLocalData("USERSTATUS", "CUSTOM", {custom_status: state.customStatus, current_status: action.payload.value});
        }
    }
})

// selectors
export const selectOnlineUsers = state => state.UserStatusSlice.onlineUsers;

export const selectOfflineUsers = state => state.UserStatusSlice.offlineUsers;

export const selectCurrentStatus = state => state.UserStatusSlice.currentStatus;

export const selectStatusMenuState = state => state.UserStatusSlice.statusMenuOpen;

export const selectCustomStatus = state => state.UserStatusSlice.customStatus;

export const selectLoadingStatusChange = state => state.UserStatusSlice.loading;

// actions 

export const { setUsers, toggleStatusMenu, setCustomState } = UserStatusSlice.actions;

export default UserStatusSlice.reducer;