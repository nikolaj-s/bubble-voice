import { createSlice } from "@reduxjs/toolkit";



const accountSettingsSlice = createSlice({
    name: "accountSettingsSlice",
    initialState: {
        profileImage: "https://res.cloudinary.com/drlkgoter/image/upload/v1654194581/Screenshot_2022-05-25_162825_svbv78.png",
        profileBanner: "https://res.cloudinary.com/drlkgoter/image/upload/v1651463736/fdru8emghbzuhatye2qy.jpg",
        userName: "Niko"
    },
    reducers: {

    }
})

// selectors

export const selectUserName = state => state.accountSettingsSlice.userName;

export const selectProfileBanner = state => state.accountSettingsSlice.profileBanner;

export const selectProfileImage = state => state.accountSettingsSlice.profileImage;

export default accountSettingsSlice.reducer;