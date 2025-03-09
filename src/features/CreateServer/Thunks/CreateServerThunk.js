import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateConfirmPassword, validatePassword } from "../../../lib/handlers/inputValidation/inputValidation";
import { getToken } from "../../../lib/services/authService";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { addServer } from "../../Servers/serversSlice";
import { closeOverlay } from "../../Overlay/overlaySlice";


export const CreateServerThunk = createAsyncThunk(
    'createServer/createServerSlice',
    async ({name, password, confirmPassword, banner}, {dispatch, rejectWithValue}) => {
        try {

            if (!name.length) return rejectWithValue("Bubble Name Cannot Be Empty");

            if (!validatePassword(password)) return rejectWithValue("Password must be at least 8 characters, contain letters, numbers, and at least 1 special character");

            if (!validateConfirmPassword(password, confirmPassword)) return rejectWithValue("Passwords do not match");

            if (!banner?.size) return rejectWithValue("Banner is required");
            
            const data = new FormData();

            const token = await getToken();

            data.append('name', name);

            data.append('password', password);

            data.append('banner', banner);
            
            const result = await axios({
                method: "POST",
                url: `${API_URL}/create-server`,
                headers: {TOKEN: token},
                data: data,
            }).then(response => {
                return response.data;
            })
            
            if (result.success) {

                dispatch(addServer(result.server));

                dispatch(closeOverlay());

            }

            return {success: true};

        } catch (error) {
            console.log(error);

            if (error.response) {
                // Server responded with a status code outside 2xx
                return rejectWithValue(error.response.data?.errorMessage || 'Invalid credentials');
            } else if (error.request) {
                // Request was made but no response received
                return rejectWithValue('No response from the server');
            } else {
                // Something else went wrong
                return rejectWithValue('An error occurred during sign-in');
            }
        }
    }
)