import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIErrorHandler } from "../../../lib/handlers/APIErrorHandler/APIErrorHandler";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { triggerAlert } from "../../Alerts/alertsSlice";

export const deleteCategory = createAsyncThunk(
    'deleteCategory/categoriesSlice',
    async ({category}, {rejectWithValue, getState, dispatch}) => {
        try {

            if (!category?.category_id) return rejectWithValue("Invalid Input");

            const {server_id} = getState().serverDetailsSlice;

            const {token} = getState().authSlice;

            const data = {category, server_id};

            await axios({
                method: "DELETE",
                url: `${API_URL}/categories/delete`,
                headers: {TOKEN: token},
                data
            })

            dispatch(triggerAlert('Category Deleted'));

            return;

        } catch (error) {
            console.log(error);
            return APIErrorHandler(rejectWithValue, error, 'Internal Server Error');
        }
    }
)