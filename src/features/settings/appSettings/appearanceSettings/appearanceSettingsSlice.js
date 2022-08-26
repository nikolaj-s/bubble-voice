import { setAppearanceSettings } from "../../../../util/LocalData";

const { createSlice } = require("@reduxjs/toolkit");

const default_color_presets = {
    light: {
        primaryColor: "rgb(255, 255, 255)",
        secondaryColor: "rgb(236, 236, 236)",
        accentColor: "rgb(217, 217, 217)",
        textColor: "rgb(0, 0, 0)",
        activationColor: "rgb(58, 235, 52)",
    },
    dark: {
        primaryColor: "rgb(65, 65, 65)",
        secondaryColor: "rgb(44, 44, 44)",
        accentColor: "rgb(24, 24, 24)",
        textColor: "rgb(255, 255, 255)",
        activationColor: "rgb(58, 235, 52)",
    }
}

const appearanceSettingsSlice = createSlice({
    name: "appearanceSettingsSlice",
    // inital state is default color scheme
    initialState: {
        primaryColor: "rgb(255, 255, 255)",
        secondaryColor: "rgb(236, 236, 236)",
        accentColor: "rgb(217, 217, 217)",
        textColor: "rgb(0, 0, 0)",
        activationColor: "rgb(58, 235, 52)",
        darkModeEnabled: false,

    },
    reducers: {
        updateColorValue: (state, action) => {
            state[action.payload.type] = action.payload.value;
        },
        toggleDarkMode: (state, action) => {
            state.darkModeEnabled = action.payload.darkMode;
            state.primaryColor = default_color_presets[action.payload.type].primaryColor;
            state.secondaryColor = default_color_presets[action.payload.type].secondaryColor;
            state.accentColor = default_color_presets[action.payload.type].accentColor;
            state.textColor = default_color_presets[action.payload.type].textColor;
        
            setAppearanceSettings(action.payload);
        }
    }
})

// actions
export const {updateColorValue, toggleDarkMode} = appearanceSettingsSlice.actions;

// color selectors
export const selectPrimaryColor = state => state.appearanceSettingsSlice.primaryColor;

export const selectSecondaryColor = state => state.appearanceSettingsSlice.secondaryColor;

export const selectAccentColor = state => state.appearanceSettingsSlice.accentColor;

export const selectTextColor = state => state.appearanceSettingsSlice.textColor;

export const selectActivationColor = state => state.appearanceSettingsSlice.activationColor;

export const selectDarkModeEnabledState = state => state.appearanceSettingsSlice.darkModeEnabled;
// export appearance settings reducer
export default appearanceSettingsSlice.reducer;