import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../lib/Validation";
import { triggerAlert } from "../../Alerts/alertsSlice";
import { updatePreferences } from "../../Account/accountSlice";


export const updateAccountPreferences = createAsyncThunk('accountPreferencesSlice/updateAccountPreferences', async (_, {getState, dispatch, rejectWithValue}) => {
    try {

        const state = getState().accountPreferencesSlice;

        const {preferences} = getState().accountSlice;

        const {token} = getState().authSlice;
        
        if (JSON.stringify(state) !== JSON.stringify(preferences)) {
            console.log('change made', state);
            await axios({
                method: "PUT",
                url: `${API_URL}/update-account/preferences`,
                data: {preferences: state},
                headers: {TOKEN: token}
            })

            dispatch(updatePreferences(state));
        }

        return state;

    } catch (error) {
        console.log(error);
        dispatch(triggerAlert('Fatal Error Updaing Preferences', 'error'))
        return rejectWithValue('Fatal Error Updating Preferences')
    }
})

