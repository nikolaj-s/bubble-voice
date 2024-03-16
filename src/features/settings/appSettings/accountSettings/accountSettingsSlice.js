import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { throwInitializationError } from "../../../initializingAppScreen/initializingAppScreenSlice";

import Axios from 'axios';
import { getToken, url } from "../../../../util/Validation";
import { setServerId, throwServerError, updateMemberFile } from "../../../server/ServerSlice";
import { socket } from "../../../server/ServerBar/ServerBar";
import { toggleSocialAltLoading } from "../../../server/SocialSlice";
import { setSocialData } from "../../../../util/LocalData";

export const fetchAccount = createAsyncThunk(
    'accountSettingsSlice/fetchAccount',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const token = await getToken();

            if (token) {
                const account = await Axios({
                    method: 'GET',
                    url: `${url}/fetch-account`,
                    headers: {"TOKEN": token},
                    
                }).then(response => {
                    
                    if (response.data.error) return rejectWithValue({error: true})

                    if (response.data.success) return {success: true, account: response.data.account}

                    return rejectWithValue({error: true});
                }).catch(error => {
                    dispatch(throwInitializationError("Connection Error"))
                })
                
                if (account.account.social_data) {
                    let parsed = new Map(JSON.parse(account.account.social_data));
                    
                    setSocialData(parsed);
                }
                
                if (account.account.last_server) {

                    dispatch(setServerId(account.account.last_server));

                    window.location.hash = `/dashboard/server/${account.account.last_server}`;

                } else {
                    window.location.hash = '/dashboard';
                }

                return account;
            } else {
                return rejectWithValue({error: true, errorMessage: "No Valid Token"});
            }
        } catch (err) {
            console.log(err);
            return rejectWithValue({error: true})
        }
    }
)

export const verifyAccount = createAsyncThunk(
    'accountSettingsSlice/verifyAccount',
    async ({access_key}, {rejectWithValue}) => {
        try {

            const token = await getToken();

            const result = await Axios({
                method: 'POST',
                url: `${url}/verify-account`,
                headers: {"TOKEN": token},
                data: {access_key: access_key}
            }).then(res => {
                return res.data;
            }).catch(err => {
                return rejectWithValue({error: true, errorMessage: err.message});
            })

            if (result.error) return rejectWithValue({error: true, errorMessage: result.errorMessage});

            return result;

        } catch (err) {
            console.log(err);
            return rejectWithValue({error: true, errorMessage: 'Fatal Error Verifying Account'})
        }
    }
)

export const updateAccount = createAsyncThunk(
    'accountSettingsSlice/updateAccount',
    async ({userImage, userBanner, newShape, color, bio, displayName, decoration}, {rejectWithValue, getState, dispatch}) => {
        const token = await getToken();

        const {password, newPassword, confirmNewPassword, showCaseScreenShots} = getState().accountSettingsSlice;

        const data = new FormData();

        data.append("displayName", displayName);

        data.append("userImage", userImage?.from_search ? userImage.url : userImage);

        data.append("bio", bio);

        data.append("userBanner", userBanner?.from_search ? userImage.url : userBanner);

        data.append("password", password);

        data.append("newPassword", newPassword);

        data.append("confirmNewPassword", confirmNewPassword);

        data.append("profileImageShape", newShape);

        data.append("color", color);

        data.append("showCaseScreenShots", showCaseScreenShots);

        data.append("decoration", decoration);

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

export const fetchProfileDecorations = createAsyncThunk(
    'accountSettingsSlice/fetchProfileDecorations',
    async (_) => {
        try {

            const token = await getToken();

            const data = await Axios({
                method: "GET",
                headers: {"TOKEN": token},
                url: `${url}/fetch-profile-decorations`
            }).then(res => {
                return res.data;
            })
console.log(data)
            if (data.error) return [];

            if (data.data.length > 0) {
                return data.data.map(d => d.decoration);
            }

            return [];
        } catch (error) {
            console.log(error);
            return [];
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
        color: "",
        steamLink: "",
        showCaseScreenShots: false,
        screenShots: [],
        verified: true,
        email: "",
        loadingDecorations: true,
        decoration: "",
        decorations: [],
    },
    reducers: {
        handleUpdateSteamLink: (state, action) => {
            state.steamLink = action.payload;
        },
        handleSignOut: (state, action) => {
            state.user_image = "";
            state.user_banner = "";
            state.username = "";
            state.display_name = "";
        },
        updateAccountInputState: (state, action) => {
            state[action.payload.state] = action.payload.value;
           
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
        },
        toggleShowCaseScreenShots: (state, action) => {
            state.showCaseScreenShots = !state.showCaseScreenShots;
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
                state.showCaseScreenShots = action.payload.account.showCaseScreenShots
                state.pinned_message = action.payload.account.pinned_message;
                state.screenShots = action.payload.account.screen_shots;
                state.verified = action.payload.account.verified;
                state.email = action.payload.account.email;
                state.decoration = action.payload.account.decoration;
            } 

            state.change = false;
        },
        [fetchAccount.rejected]: (state, action) => {
            
            if (action?.payload?.error) {
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

            if (updated_info.decoration) state.decoration = updated_info.decoration;
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

        },
        [verifyAccount.pending]: (state, action) => {
            state.loading = true;
        },
        [verifyAccount.fulfilled]: (state, action) => {
            state.verified = true;
            state.loading = false;
            state.error = false;
        },
        [verifyAccount.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchProfileDecorations.pending]: (state, action) => {
            state.loadingDecorations = true;
            
        },
        [fetchProfileDecorations.fulfilled]: (state, action) => {
            state.loadingDecorations = false;
            state.decorations = action.payload;
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

export const selectSteamLink = state => state.accountSettingsSlice.steamLink;

export const selectUsersScreenShots = state => state.accountSettingsSlice.screenShots;

export const selectShowCaseScreenShotsState = state => state.accountSettingsSlice.showCaseScreenShots;

export const selectAccountVerified = state => state.accountSettingsSlice.verified;

export const selectEmail = state => state.accountSettingsSlice.email;

export const selectProfileDecorations = state => state.accountSettingsSlice.decorations;

export const selectCurrentDecoration = state => state.accountSettingsSlice.decoration;

export const selectLoadingDecorations = state => state.accountSettingsSlice.loadingDecorations;

// actions
export const {toggleShowCaseScreenShots, handleUpdateSteamLink, handleUpdateBio, updateNewAccountState, handleSignOut, updateAccountInputState, accountSettingsCloseError } = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;