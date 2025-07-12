import { createSlice } from "@reduxjs/toolkit";
import { updateAccountPreferences } from "./Thunks/updateAccountPreferences";
import { isValidObjectId } from "../../lib/services/helperFunctions";

const accountPreferencesSlice = createSlice({
    name: 'accountPreferencesSlice',
    initialState: {},
    reducers: {
        setPreferences: (state, action) => {
            console.log(action.payload)
            return action.payload;
        },
        togglePreference: (state, action) => {
            
            state[action.payload] = !state[action.payload];
        },
        setNotificationMute: (state, action) => {

            const {key, value} = action.payload;

            const muted_notifications = state.muted_notifications || {};

            if (isValidObjectId(key) && typeof value === 'object') {

                muted_notifications[key] = value;

                state.muted_notifications = muted_notifications;
            }

        },
        removeNotificationMute: (state, action) => {
            if (state.muted_notifications) {
                delete state.muted_notifications[action.payload];
            }
          
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateAccountPreferences.fulfilled, (state, action) => {
            
            state = action.payload;
        })
    }
})

export const {setPreferences, togglePreference, setNotificationMute, removeNotificationMute} = accountPreferencesSlice.actions;

export default accountPreferencesSlice.reducer;