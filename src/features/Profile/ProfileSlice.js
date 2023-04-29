
import { createSlice } from "@reduxjs/toolkit"

const ProfileSlice = createSlice({
    name: "ProfileSlice",
    initialState: {
        open: false,
        createPostMenu: false
    },
    reducers: {
        toggleProfileTab: (state, action) => {
            state.open = action.payload;
        },
        toggleCreatePostMenu: (state, action) => {
            state.createPostMenu = action.payload;
        }
    }
})

export const selectProfileTabOpen = state => state.ProfileSlice.open;

export const selectCreatePostMenuOpen = state => state.ProfileSlice.createPostMenu;

export const {toggleProfileTab, toggleCreatePostMenu} = ProfileSlice.actions;

export default ProfileSlice.reducer;