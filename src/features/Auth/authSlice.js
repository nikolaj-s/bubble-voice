import { createSlice } from "@reduxjs/toolkit";

import { signupThunk as signUp } from "./Thunks/SignupThunk";
import { signinThunk as signIn } from "./Thunks/SigninThunk";
import { clearToken, getToken } from "../../lib/services/authService";
import { signInWithGoogle } from "./Thunks/signInWithGoogle";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  emailError: false,
  passwordError: false,
  usernameError: false,
  signinError: false,
  confirmPasswordError: false,
  error: false,
  acceptedTerms: false,
  token: getToken()
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setJWT: (state, action) => {
      state.token = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      clearToken();
      window.location.pathname = '/';
    },
    throwAuthInputError: (state, action) => {
      state[action.payload.state] = action.payload.error;
    },
    toggleAcceptedTerms: (state, action) => {
      state.acceptedTerms = !state.acceptedTerms;
    }
  },
  extraReducers: (builder) => {
    // sign in
    builder
    .addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.signinError = false;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.successMessage = 'Sign-in successful!';
      if (action.payload.authorized) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
      }
    })
    .addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload?.errorType) {
        state[action.payload.errorType] = action.payload.errorMessage || 'An error occurred during sign-in';
      } else {
        state.error = action.payload;
      }
      
    })
    // sign up
    .addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.usernameError = false;
      state.passwordError = false;
      state.emailError = false;
      state.confirmPasswordError = false;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      console.log('success')
      state.isLoading = false;
      state.user = action.payload;
      state.successMessage = 'Sign-up successful!';
      if (action.payload.authorized) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
      }
      
    })
    .addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload?.errorType) {
        state[action.payload.errorType] = action.payload.errorMessage || 'An error occurred during sign-in';
      } else {
        state.error = action.payload;
      }
    })
    // sign up / in with google
    .addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    })
    .addCase(signInWithGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      if (action.payload.authorized) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
      }
    })
  }
});

export const selectEmailError = state => state.authSlice.emailError;

export const selectPasswordError = state => state.authSlice.passwordError;

export const selectAuthLoading = state => state.authSlice.isLoading;

export const selectSigninError = state => state.authSlice.signinError;

export const selectUsernameError = state => state.authSlice.usernameError;

export const selectConfirmPasswordError = state => state.authSlice.confirmPasswordError;

export const selectGeneralAuthError = state => state.authSlice.error;

export const selectAuthenticated = state => state.authSlice.isAuthenticated;

export const { login, logout, throwAuthInputError, toggleAcceptedTerms } = authSlice.actions;

export default authSlice.reducer;
