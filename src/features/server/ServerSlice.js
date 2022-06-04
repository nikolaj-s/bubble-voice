import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchServerDetails = createAsyncThunk(
    'serverBarSlice/fetchServerDetails',
    async (_, {rejectWithValue}) => {
        return {
            _id: "9328rhjhfi32ui3r24huiy",
            server_icon_image: "",
            server_banner_image: "https://www.outsideonline.com/wp-content/uploads/migrated-images_parent/migrated-images_78/igloo-real-tools_h.jpg",
            channels: [
                {
                    _id: "12945ngf0n92ne",
                    channelName: ""
                }
            ],
            users: [
                {}
            ],
            permissionGroups: [
                {}
            ]
        }
    }
)

const serverSlice = createSlice({
    name: "serverSlice",
    initialState: {
        server_id: "",
        loading: true,
        serverName: "",
        server: {},
    },
    reducers: {
        setServerName: (state, action) => {
            state.serverName = action.payload;
        },
        setServerId: (state, action) => {
            state.server_id = action.payload;
        }
    },
    extraReducers: {
        [fetchServerDetails.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchServerDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.server = action.payload;
        },
        [fetchServerDetails.rejected]: (state, action) => {

        }
    }
})

// selectors
export const selectServerName = state => state.serverSlice.serverName;

export const selectServer = state => state.serverSlice.server;

export const selectLoadingServerDetailsState = state => state.serverSlice.loading;

// actions

export const {setServerName, setServerId} = serverSlice.actions;

export default serverSlice.reducer;
