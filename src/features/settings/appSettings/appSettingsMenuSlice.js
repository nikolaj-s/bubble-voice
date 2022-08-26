
import { createSlice } from "@reduxjs/toolkit";

const appSettingsMenuSlice = createSlice({
    name: "appSettingsMenuSlice",
    initialState: {
        settings: [
            {name: "Account", link: "account"},
            {name: "Appearance", link: "appearance"},
            {name: "Key Bindings", link: "keybindings"},
            {name: "Sound", link: 'sound-settings'},
            {name: "Voice / Video", link: "voice-video"},
        ]
    }
})

// selectors
export const selectAppSettings = state => state.appSettingsMenuSlice.settings;

export default appSettingsMenuSlice.reducer;