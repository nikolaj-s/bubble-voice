import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { updateWidget } from "../widgetsSlice";
import { addPinnedWidget, removePinnedWidget } from "../pinnedWidgetsSlice";

export const editWidget = createAsyncThunk('editWidget/manageWidgetsSlice', async (params, {getState, dispatch, rejectWithValue}) => {
    try {

        const {token} = getState().authSlice;

        const {server_id} = getState().serverDetailsSlice;

        const widget = params;

        const response = await axios({
            method: "PUT",
            url: `${API_URL}/widgets/edit`,
            headers: {TOKEN: token},
            data: {widget, server_id}
        })

        if (params.pinning) {
            dispatch(triggerAlert('Pinned Widget'));
            dispatch(addPinnedWidget(response.data));
        } else if (params.pinning === false) {
            dispatch(triggerAlert('Unpinned Widget'));
            dispatch(removePinnedWidget(response.data));
        }

        dispatch(updateWidget(response.data));

        return response.data;

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert('Fatal Error Editing Widget', 'error'));
        return APIErrorHandler(rejectWithValue, error);
    }
})