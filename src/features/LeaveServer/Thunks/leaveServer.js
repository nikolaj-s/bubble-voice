import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { removeServer } from "../../Servers/serversSlice";
import { setOverlay } from "../../Overlay/overlaySlice";
import { resetServerDetails } from "../../ServerDetails/serverDetailsSlice";


export const leaveServer = createAsyncThunk('leaveServer/leaveServerSlice', async (_, {getState, rejectWithValue, dispatch}) => {
    try {   

        const {token} = getState().authSlice;

        const {leavingServer} = getState().leaveServerSlice;

        const {server_id} = getState().serverDetailsSlice;

        if (!leavingServer?._id) return rejectWithValue("No server selected to leave from");

        await axios({
            method: "POST",
            url: `${API_URL}/server/leave`,
            headers: {TOKEN: token},
            data: {server_id: leavingServer._id}
        })

        if (leavingServer?._id === server_id) {
            dispatch(resetServerDetails());
        }

        dispatch(removeServer({server_id: leavingServer?._id}));

        dispatch(setOverlay(null));

        return true;

    } catch (error) {
        console.log(error);
        return APIErrorHandler(rejectWithValue, error);
    }
})