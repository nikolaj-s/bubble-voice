
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";
import { setToken, url } from "../../../util/Validation";



export const handleSignIn = createAsyncThunk(
    'signInSlice/handleSignIn',
    async (_, { rejectWithValue, getState }) => {

        const {email, password} = getState().signInSlice;

        if (email.length < 1) return rejectWithValue({error: true, errorMessage: "Email Input Cannot Be Empty"});

        if (!email.includes('@')) return rejectWithValue({error: true, errorMessage: "Invalid Email"});

        if (password.length < 1) return rejectWithValue({error: true, errorMessage: "Invalid Password"});

        const Account = await Axios({
            method: "POST",
            url: `${url}/sign-in`,
            data: {email: email, password: password}
        }).then(response => {
            
            if (response.data.error) return rejectWithValue({error: true, errorMessage: response.data.errorMessage});

            if (response.data.success) return {success: true, token: response.data.token};

            return rejectWithValue({error: true, errorMessage: "Unexpected Error Has Occured"})

        })

        return Account;
        
    }
)

const signInSlice = createSlice({
    name: "signInSlice",
    initialState: {
        email: "",
        password: "",
        loading: false,
        error: false,
        errorMessage: "",
        loggedIn: false
    },
    reducers: {
        handleSignInInput: (state, action) => {
            state[action.payload.state] = action.payload.value;
        },
        closeSignInError: (state, action) => {
            state.error = false;
            state.errorMessage = "";
        },
        signInHandleLogOutState: (state, action) => {
            state.loggedIn = false;
        }
    },
    extraReducers: {
        [handleSignIn.pending]: (state, action) => {
            state.loading = true;
        },
        [handleSignIn.fulfilled]: (state, action) => {
            state.loading = false;
            state.password = "";
            if (action.payload.success) {
                setToken(action.payload.token);
                state.email = "";
                window.location.hash = "/"
                state.loggedIn = true;
            }
        },
        [handleSignIn.rejected]: (state, action) => {
            state.password = ""
            state.loading = false;
            state.error = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

// selectors
export const selectEmail = state => state.signInSlice.email;

export const selectPassword = state => state.signInSlice.password;

export const selectSignInErrorState = state => state.signInSlice.error;

export const selectSignInErrorMessage = state => state.signInSlice.errorMessage;

export const selectSignInLoading = state => state.signInSlice.loading;

export const selectLoggedIn = state => state.signInSlice.loggedIn;

// actions
export const { closeSignInError, handleSignInInput, signInHandleLogOutState } = signInSlice.actions;

export default signInSlice.reducer;