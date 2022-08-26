import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";
import { setToken, url } from "../../../util/Validation";

export const handleSignUp = createAsyncThunk(
    'signUpSlice/handleSignUp',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().signUpSlice;

        if (state.username.length < 1) return rejectWithValue({error: true, errorMessage: "User Name Input Cannot Be Empty"})

        if (state.email.length < 1) return rejectWithValue({error: true, errorMessage: "Email Input Cannot Be Empty"})

        if (!state.email.includes('@')) return rejectWithValue({error: true, errorMessage: "Invalid Email"});

        if (state.password.length < 1) return rejectWithValue({error: true, errorMessage: "Password Input Cannot Be Empty"})

        if (state.password !== state.confirmPassword) return rejectWithValue({error: true, errorMessage: "Passwords Do Not Match"})
        
        const result = await Axios({
            url: `${url}/sign-up`,
            method: "POST",
            data: {
                username: state.username,
                email: state.email,
                password: state.password,
                confirmPassword: state.confirmPassword
            }
        }).then(response => {
            
            if (response.data.error) {
                return rejectWithValue(response.data)
            }

            return response.data;
        })
        
        return result;
    }
)

const signUpSlice = createSlice({
    name: "signUpSlice",
    initialState: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
        error: false,
        errorMessage: "",
        signedUp: false
    },
    reducers: {
        handleSignUpInput: (state, action) => {
            state[action.payload.state] = action.payload.value
        },
        closeSignUpError: (state, action) => {
            state.error = false;
        }
    },
    extraReducers: {
        [handleSignUp.pending]: (state, action) => {
            state.loading = true;
        },
        [handleSignUp.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.success) {
               setToken(action.payload.token)
               window.location.hash = "/";
               state.signedUp = !state.signedUp;
            }
        },
        [handleSignUp.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

// selectors
export const selectSignedUp = state => state.signUpSlice.signedUp;

export const selectSignUpUserName = state => state.signUpSlice.username;

export const selectSignUpEmail = state => state.signUpSlice.emaill;

export const selectSignUpPassword = state => state.signUpSlice.password;

export const selectSignUpConfirmPassword = state => state.signUpSlice.confirmPassword;

export const selectSignUpLoading = state => state.signUpSlice.loading;

export const selectSignUpErrorState = state => state.signUpSlice.error;

export const selectSignUpErrorMessage = state => state.signUpSlice.errorMessage;

// actions
export const { handleSignUpInput, closeSignUpError } = signUpSlice.actions;

export default signUpSlice.reducer;