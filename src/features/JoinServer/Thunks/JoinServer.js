import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { getToken } from "../../../lib/services/authService";
import { addServer } from "../../Servers/serversSlice";
import { closeOverlay } from "../../Overlay/overlaySlice";


export const JoinServer = createAsyncThunk(
    'joinServerSlice/JoinServer',
    async ({navigate}, {rejectWithValue, getState, dispatch}) => {
        try {

            const {password, selectedServer} = getState().joinServerSlice;

            if (!password) return rejectWithValue("Invalid Password");

            if (!selectedServer?.server_id) return rejectWithValue("Invalid Server ID");

            const token = await getToken();

            const response = await axios.post(`${API_URL}/join-new-server`, {
                password: password,
                server_id: selectedServer.server_id
            }, {headers: {TOKEN: token}}).then(res => {
                return res.data;
            })

            if (response.success) {

                dispatch(addServer(response.server));

                if (navigate) {

                    navigate(`/dashboard/server/${response.server.server_id}`)

                }

                dispatch(closeOverlay());

                return {success: true};
            } else {
                return rejectWithValue("Unexpected error occured")
            }

        } catch (error) {
            return APIErrorHandler(rejectWithValue, error, 'Fatal Internal Server Error');
        }
    }
)