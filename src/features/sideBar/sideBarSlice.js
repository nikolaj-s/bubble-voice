import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsersServerList = createAsyncThunk(
    'sideBarSlice/fetchUsersServerList',
    async (_, {rejectWithValue}) => {
        // placeholder functionality
        
        return [
            {   
                _id: "3298jf92bnnds2",
                server_name: "The Igloo",
                server_icon: "https://www.outsideonline.com/wp-content/uploads/migrated-images_parent/migrated-images_78/igloo-real-tools_s.jpg"
            },
            {
                _id: "329ht3gv3nds2",
                server_name: "The Igloo",
                server_icon: "https://www.outsideonline.com/wp-content/uploads/migrated-images_parent/migrated-images_78/igloo-real-tools_s.jpg"
            },
            {
                _id: "329f234f4ds2",
                server_name: "The Igloo",
                server_icon: "https://www.outsideonline.com/wp-content/uploads/migrated-images_parent/migrated-images_78/igloo-real-tools_s.jpg"
            }
        ]
    }
)

const sideBarSlice = createSlice({
    name: "sideBarSlice",
    initialState: {
        serverList: [],
        loadingUsersServers: true,
        header: "Servers"
    },
    reducers: {
        setSideBarHeader: (state, action) => {
            state.header = action.payload;
        }
    },
    extraReducers: {
        [fetchUsersServerList.pending]: (state, action) => {
            state.loadingUsersServers = true;
        },
        [fetchUsersServerList.fulfilled]: (state, action) => {
            
            state.serverList = action.payload;
            state.loadingUsersServers = false;
            
        },
        [fetchUsersServerList.rejected]: (state, action) => {

        }
    }
})

// selectors

export const selectServerList = state => state.sideBarSlice.serverList;

export const selectLoadingUsersServersState = state => state.sideBarSlice.loadingUsersServers;

export const selectSideBarHeader = state => state.sideBarSlice.header;

// actions

export const {setSideBarHeader} = sideBarSlice.actions;

export default sideBarSlice.reducer;