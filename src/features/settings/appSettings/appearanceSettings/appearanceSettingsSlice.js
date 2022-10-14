import { setAppearanceSettings, fetchAppearanceSettings } from "../../../../util/LocalData";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const updatePersistedAppTheme = createAsyncThunk(
    'updatePersistedAppTheme/appearanceSettingsSlice',
    async (_, { rejectWithValue }) => {
        try {

            const data = await fetchAppearanceSettings();
            
            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true})
        }
    }
)

const appearanceSettingsSlice = createSlice({
    name: "appearanceSettingsSlice",
    // inital state is default color scheme
    initialState: {
        primaryColor: "rgb(255, 255, 255)",
        secondaryColor: "rgb(236, 236, 236)",
        accentColor: "rgb(217, 217, 217)",
        textColor: "rgb(0, 0, 0)",
        activationColor: "rgb(58, 235, 52)",
        darkModeEnabled: true,
        changeMade: false,
        color_themes: {
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
            },
            custom: {
                primaryColor: "rgb(65, 65, 65)",
                secondaryColor: "rgb(44, 44, 44)",
                accentColor: "rgb(24, 24, 24)",
                textColor: "rgb(255, 255, 255)",
                activationColor: "rgb(58, 235, 52)",
            }
        },
        current_theme: {label: 'Light', state: 'light'},
        theme_options: [{label: 'Light', state: 'light'}, {label: 'Dark', state: 'dark'}, {label: 'Custom', state: 'custom'}]
    },
    reducers: {
        updateColorValue: (state, action) => {

            state.current_theme = {label: "Custom", state: 'custom'};

            state.changeMade = true;

            state[action.payload.type] = action.payload.value;
        },
        changeTheme: (state, action) => {

            state.changeMade = true;

            state.current_theme = action.payload;

            state.primaryColor = state.color_themes[action.payload.state].primaryColor;
            state.secondaryColor = state.color_themes[action.payload.state].secondaryColor;
            state.accentColor = state.color_themes[action.payload.state].accentColor;
            state.textColor = state.color_themes[action.payload.state].textColor;

        },
        saveTheme: (state, action) => {

            state.changeMade = false;

            const new_theme_object = {
                themes: {
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
                    },
                    custom: {
                        primaryColor: state.primaryColor,
                        secondaryColor: state.secondaryColor,
                        accentColor: state.accentColor,
                        textColor: state.textColor,
                        activationColor: state.activationColor,
                    }
                },
                current_theme: state.current_theme
            }

            state.color_themes = new_theme_object.themes;

            setAppearanceSettings(new_theme_object);

        }

    },
    extraReducers: {
        [updatePersistedAppTheme.fulfilled]: (state, action) => {
            try {
                if (action.payload?.themes) {
                    
                    state.color_themes = action.payload.themes;

                    state.current_theme = action.payload.current_theme;

                    state.primaryColor = state.color_themes[action.payload.current_theme.state].primaryColor;

                    state.secondaryColor = state.color_themes[action.payload.current_theme.state].secondaryColor;

                    state.accentColor = state.color_themes[action.payload.current_theme.state].accentColor;

                    state.textColor = state.color_themes[action.payload.current_theme.state].textColor;

                }

                return;
            } catch (error) {
                // use system defaults if error thrown
                return;
            }
        },
        [updatePersistedAppTheme.rejected]: (state, action) => {
            try {
                return;
            } catch (error) {
                // use system defaults
                return;
            }
        }
    }
})

// actions
export const { updateColorValue, changeTheme, saveTheme } = appearanceSettingsSlice.actions;

// color selectors
export const selectPrimaryColor = state => state.appearanceSettingsSlice.primaryColor;

export const selectSecondaryColor = state => state.appearanceSettingsSlice.secondaryColor;

export const selectAccentColor = state => state.appearanceSettingsSlice.accentColor;

export const selectTextColor = state => state.appearanceSettingsSlice.textColor;

export const selectActivationColor = state => state.appearanceSettingsSlice.activationColor;

export const selectDarkModeEnabledState = state => state.appearanceSettingsSlice.darkModeEnabled;

export const selectCurrentTheme = state => state.appearanceSettingsSlice.current_theme;

export const selectThemeOptions = state => state.appearanceSettingsSlice.theme_options;

export const selectAppearanceChangeMade = state => state.appearanceSettingsSlice.changeMade;
// export appearance settings reducer
export default appearanceSettingsSlice.reducer;