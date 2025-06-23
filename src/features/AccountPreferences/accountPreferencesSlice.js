import { createSlice } from "@reduxjs/toolkit";
import { updateAccountPreferences } from "./Thunks/updateAccountPreferences";


const accountPreferencesSlice = createSlice({
    name: 'accountPreferencesSlice',
    initialState: {},
    reducers: {
        setPreferences: (state, action) => {
            return action.payload;
        },
        togglePreference: (state, action) => {
            
            state[action.payload] = !state[action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateAccountPreferences.fulfilled, (state, action) => {
            
            state = action.payload;
        })
    }
})

export const {setPreferences, togglePreference} = accountPreferencesSlice.actions;

export default accountPreferencesSlice.reducer;