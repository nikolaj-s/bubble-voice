import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { throwInitializationError } from "../../../initializingAppScreen/initializingAppScreenSlice";

import Axios from 'axios';
import { getToken, url } from "../../../../util/Validation";
import { setServerId, setServerName, throwServerError, updateMemberFile } from "../../../server/ServerSlice";
import { socket } from "../../../server/ServerBar/ServerBar";
import { toggleSocialAltLoading } from "../../../server/SocialSlice";

export const fetchAccount = createAsyncThunk(
    'accountSettingsSlice/fetchAccount',
    async (_, { rejectWithValue, dispatch, getState }) => {

        const token = await getToken();

        const { defaultServer } = getState().MiscellaneousSettingsSlice;

        if (token) {
            const account = await Axios({
                method: 'GET',
                url: `${url}/fetch-account`,
                headers: {"TOKEN": token}
            }).then(response => {
                
                if (response.data.error) return rejectWithValue({error: true})

                if (response.data.success) return {success: true, account: response.data.account}

                return rejectWithValue({error: true});
            }).catch(error => {
                dispatch(throwInitializationError("Connection Error"))
            })

            if (defaultServer.id) {

                dispatch(setServerId(defaultServer.id));

                dispatch(setServerName(defaultServer.server_name));

                window.location.hash = `/dashboard/server/${defaultServer.server_name}`;

            } else {
                window.location.hash = '/dashboard';
            }

            return account;
        } else {
            return rejectWithValue({error: true, errorMessage: "No Valid Token"});
        }
    }
)

export const updateAccount = createAsyncThunk(
    'accountSettingsSlice/updateAccount',
    async ({userImage, userBanner, newShape, color}, {rejectWithValue, getState, dispatch}) => {
        const token = await getToken();

        const {password, newPassword, confirmNewPassword, display_name, bio} = getState().accountSettingsSlice;

        const data = new FormData();

        data.append("displayName", display_name);

        data.append("userImage", userImage);

        data.append("bio", bio);

        data.append("userBanner", userBanner);

        data.append("password", password);

        data.append("newPassword", newPassword);

        data.append("confirmNewPassword", confirmNewPassword);

        data.append("profileImageShape", newShape);

        data.append("color", color);

        if (!token) return rejectWithValue({error: true, errorMessage: "validation error"})

        const update = await Axios({
            method: "POST",
            url: `${url}/update-account`,
            headers: {"TOKEN": token},
            data
        }).then(response => {

            if (response.data.error) {
                return rejectWithValue({error: true, errorMessage: response.data.errorMessage})
            }

            return response.data;
        })

        if (update && socket) {
            await socket.request('update member file')
            .then(res => {
                return dispatch(updateMemberFile(res.user));
            })
            .catch(error => {
                return  rejectWithValue({error: true, errorMessage: error})
            })
        }

        return update;
        
    }
)

export const handlePinMessageToProfile = createAsyncThunk(
    'accountSettingsSlice/handlePinMessageToProfile',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {

            const token = await getToken();

            if (!token) return rejectWithValue({error: true, errorMessage: "validation error"})

            let data = new FormData();

            data.append('message_id', id);

            dispatch(toggleSocialAltLoading(true));

            const result = await Axios({
                method: "POST",
                headers: {"TOKEN": token},
                url: `${url}/pin-message`,
                data: data
            })
            .then(res => {
                if (res.data.error) {
                    dispatch(throwServerError({errorMessage: res.data.errorMessage}));
                    return rejectWithValue({});
                }

                return res.data;
            })
            .catch(err => {
                console.log(err)

            })

            console.log(result);

            dispatch(toggleSocialAltLoading(false));

            return result;

        } catch (error) {   
            console.log(error);
            dispatch(toggleSocialAltLoading(false));
        }
    }
)

const accountSettingsSlice = createSlice({
    name: "accountSettingsSlice",
    initialState: {
        user_image: "",
        user_banner: "",
        username: "",
        display_name: "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
        pinned_message: {},
        profilePictureShape: "circle",
        loading: false,
        error: false,
        errorMessage: "",
        change: false,
        new_account: false,
        bio: "",
        color: ""
    },
    reducers: {
        handleSignOut: (state, action) => {
            state.user_image = "";
            state.user_banner = "";
            state.username = "";
            state.display_name = "";
        },
        updateAccountInputState: (state, action) => {
            state[action.payload.state] = action.payload.value;
            state.change = true;
        },
        accountSettingsCloseError: (state, action) => {
            state.error = false;
            state.errorMessage = "";
        },
        updateNewAccountState: (state, action) => {
            state.new_account = false;
        },
        handleUpdateBio: (state, action) => {
            state.bio = action.payload;
            state.change = true;
        }
    },
    extraReducers: {
        [fetchAccount.fulfilled]: (state, action) => {
            
            if (action.payload?.success) {
                
                state.display_name = action.payload.account.display_name;
                state.user_image = action.payload.account.user_image;
                state.user_banner = action.payload.account.user_banner;
                state.username = action.payload.account.username;
                state.new_account = action.payload.account.new_account_state || action.payload.account.user_image === "https://res.cloudinary.com/drlkgoter/image/upload/v1663868935/1-Blank-TikTok-Default-PFP_jt6guo.jpg" || action.payload.account.user_banner === "https://res.cloudinary.com/drlkgoter/image/upload/v1663868935/1-Blank-TikTok-Default-PFP_jt6guo.jpg";
                state.bio = action.payload.account.bio;
                state.color = action.payload.account.color;
                if (action.payload.account.profile_picture_shape) {

                    state.profilePictureShape = action.payload.account.profile_picture_shape;
                
                }
                state.pinned_message = action.payload.account.pinned_message;
            } 

            state.change = false;
        },
        [fetchAccount.rejected]: (state, action) => {
            
            if (action.payload.error) {
                window.location.hash = "/signin"
            }
        },
        [updateAccount.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAccount.fulfilled]: (state, action) => {
            state.loading  = false;

            state.change = false;

            state.password = "";

            state.newPassword = "";

            state.confirmNewPassword = "";

            state.new_account = false;

            if (!action.payload.success) return;

            const updated_info = action.payload.user;

            state.bio = updated_info.bio;

            state.color = updated_info.color;

            if (updated_info.display_name) state.display_name = updated_info.display_name;

            if (updated_info.user_banner) state.user_banner = updated_info.user_banner;

            if (updated_info.user_image) state.user_image = updated_info.user_image;

            if (updated_info.profile_picture_shape) state.profilePictureShape = updated_info.profile_picture_shape;

        },
        [updateAccount.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        },
        [handlePinMessageToProfile.pending]: (state, action) => {

        },
        [handlePinMessageToProfile.fulfilled]: (state, action) => {
            state.pinned_message = action.payload.message;
        },
        [handlePinMessageToProfile.rejected]: (state, action) => {

        }
    }
})

// selectors
export const selectAccountSettingsStateChanged = state => state.accountSettingsSlice.change;

export const selectAccountSettingsPassword = state => state.accountSettingsSlice.password;

export const selectAccountSettingsNewPassword = state => state.accountSettingsSlice.newPassword;

export const selectAccountSettingsConfirmNewPassword = state => state.accountSettingsSlice.confirmNewPassword;

export const selectAccountSettingsLoading = state => state.accountSettingsSlice.loading;

export const selectAccountSettingsErrorState = state => state.accountSettingsSlice.error;

export const selectAccountSettingsErrorMessage = state => state.accountSettingsSlice.errorMessage;

export const selectToken = state => state.accountSettingsSlice.token;

export const selectDisplayName = state => state.accountSettingsSlice.display_name;

export const selectUsername = state => state.accountSettingsSlice.username;

export const selectUserBanner = state => state.accountSettingsSlice.user_banner;

export const selectUserImage = state => state.accountSettingsSlice.user_image;

export const selectNewAccountState = state => state.accountSettingsSlice.new_account;

export const selectProfilePictureShape = state => state.accountSettingsSlice.profilePictureShape;

export const selectProfileBio = state => state.accountSettingsSlice.bio;

export const selectProfileColor = state => state.accountSettingsSlice.color;

export const selectProfilePinnedMessage = state => state.accountSettingsSlice.pinned_message;

// actions
export const {handleUpdateBio, updateNewAccountState, handleSignOut, updateAccountInputState, accountSettingsCloseError } = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;