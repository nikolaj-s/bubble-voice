import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateConfirmPassword, validateEmail, validatePassword, validateUsername } from "../../../lib/handlers/inputValidation/inputValidation";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { clearToken, setToken } from "../../../lib/services/authService";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";

export const signupThunk = createAsyncThunk(
    'auth/signUp',
    async ({ username, email, password, confirmPassword }, { rejectWithValue, getState }) => {
        try {

            if (!validateUsername(username)) {
                return rejectWithValue({ errorMessage: 'Username must be 3-30 characters long and can only contain letters, numbers, and underscores.', errorType: 'usernameError' });
            }
            if (!validateEmail(email)) {
                return rejectWithValue({ errorMessage: 'Please enter a valid email address.', errorType: "emailError" });
            }
            if (!validatePassword(password)) {
                return rejectWithValue({ errorMessage: 'Password must be at least 8 characters long and contain both letters, numbers, and at least 1 special character.', errorType: 'passwordError' });
            }
            if (!validateConfirmPassword(password, confirmPassword)) {
                return rejectWithValue({ errorMessage: 'Passwords do not match.', errorType: 'confirmPasswordError' });
            }

            const {acceptedTerms} = getState().authSlice;

            if (!acceptedTerms) return rejectWithValue("You must accept the terms of bubble");

            const response = await axios.post(`${API_URL}/sign-up`, { email, password, username, confirmPassword });

            if (response.status >= 200 && response.status < 300) {

                if (response?.data?.success) {

                    clearToken();

                    setToken(response?.data?.token)

                    return {authorized: true, token: response.data.token}
                }

                return {error: "Fatal Error"}; // Expected to contain user info and token
            } else {
            return rejectWithValue('Unexpected server response');
            }
        
        } catch (error) {
           return APIErrorHandler(rejectWithValue, error, 'Fatal error signing up, please try again later')// Assuming the error message is in response.data
        }
    }
);

