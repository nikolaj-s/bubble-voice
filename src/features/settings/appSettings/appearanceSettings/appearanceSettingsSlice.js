import { fetchSavedLocalData, saveLocalData } from "../../../../util/LocalData";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const updatePersistedAppTheme = createAsyncThunk(
    'updatePersistedAppTheme/appearanceSettingsSlice',
    async (_, { rejectWithValue }) => {
        try {

            const data = await fetchSavedLocalData("APPEARANCE", "VISUAL");
            
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
            },
            fall: {
                primaryColor: "rgb(174, 67, 30)",
                secondaryColor: "rgb(208, 98, 36)",
                accentColor: "rgb(138, 134, 53)",
                textColor: "rgb(233, 200, 145)",
                activationColor: "rgb(233, 200, 145)",
            },
            forest: {
                primaryColor: "rgb(95, 113, 97)",
                secondaryColor: "rgb(109, 139, 116)",
                accentColor: "rgb(239, 234, 216)",
                textColor: "rgb(208, 201, 192)",
                activationColor: "rgb(95, 113, 97)",
            },
            neon: {
                primaryColor: "rgb(88, 0, 255)",
                secondaryColor: "rgb(0, 150, 255)",
                accentColor: "rgb(0, 215, 255)",
                textColor: "rgb(0, 255, 251)",
                activationColor: "rgb(212, 0, 97)",
            },
            coffee: {
                primaryColor: "rgb(235, 225, 203)",
                secondaryColor: "rgb(158, 118, 118)",
                accentColor: "rgb(129, 91, 91)",
                textColor: "rgb(89, 69, 69)",
                activationColor: "rgb(255, 248, 234)",
            },
            green: {
                primaryColor: "rgb(62, 70, 55)",
                secondaryColor: "rgb(76, 88, 68)",
                accentColor: "rgb(40, 46, 34)",
                textColor: "rgb(255, 255, 255)",
                activationColor: "rgb(58, 235, 52)",
            }
        },
        current_theme: {label: 'Light', state: 'light'},
        theme_options: [{label: 'Light', state: 'light'}, {label: 'Dark', state: 'dark'}, {label: 'Custom', state: 'custom'}, {label: "Fall", state: 'fall'}, {label: "Forest", state: 'forest'}, {label: 'Neon', state: 'neon'}, {label: 'Coffee', state: 'coffee'}, {label: 'Green', state: 'green'}]
    },
    reducers: {
        updateColorValue: (state, action) => {

            state.current_theme = {label: "Custom", state: 'custom'};

            state.changeMade = true;

            state[action.payload.type] = action.payload.value;

            if (action.payload.type === 'accentColor') {
                document.querySelector(':root').style.setProperty('--range-background', state.accentColor)
            }
        },
        changeTheme: (state, action) => {

            state.changeMade = true;

            state.current_theme = action.payload;

            state.primaryColor = state.color_themes[action.payload.state].primaryColor;
            state.secondaryColor = state.color_themes[action.payload.state].secondaryColor;
            state.accentColor = state.color_themes[action.payload.state].accentColor;
            state.textColor = state.color_themes[action.payload.state].textColor;
            state.activationColor = state.color_themes[action.payload.state].activationColor;

            document.querySelector(':root').style.setProperty('--range-background', state.color_themes[action.payload.state].accentColor)
        },
        saveTheme: (state, action) => {

            state.changeMade = false;

            const new_theme_object = {
                themes: {
                    custom: {
                        primaryColor: state.current_theme.state !== 'custom' ? state.color_themes['custom'].primaryColor : state.primaryColor,
                        secondaryColor: state.current_theme.state !== 'custom' ? state.color_themes['custom'].secondaryColor : state.secondaryColor,
                        accentColor: state.current_theme.state !== 'custom' ? state.color_themes['custom'].accentColor : state.accentColor,
                        textColor: state.current_theme.state !== 'custom' ? state.color_themes['custom'].textColor : state.textColor,
                        activationColor: state.current_theme.state !== 'custom' ? state.color_themes['custom'].activationColor : state.activationColor,
                    }
                },
                current_theme: state.current_theme
            }

            state.color_themes = {...state.color_themes, custom: new_theme_object.themes.custom};

            saveLocalData("APPEARANCE", "VISUAL", new_theme_object)

        }

    },
    extraReducers: {
        [updatePersistedAppTheme.fulfilled]: (state, action) => {
            try {
                if (action.payload?.themes) {

                    state.color_themes = {...state.color_themes, custom: action.payload.themes.custom}

                    state.current_theme = action.payload.current_theme;

                    state.primaryColor = state.color_themes[action.payload.current_theme.state].primaryColor;

                    state.secondaryColor = state.color_themes[action.payload.current_theme.state].secondaryColor;

                    state.accentColor = state.color_themes[action.payload.current_theme.state].accentColor;

                    state.textColor = state.color_themes[action.payload.current_theme.state].textColor;

                    state.activationColor = state.color_themes[action.payload.current_theme.state].activationColor;
                    
                    document.querySelector(':root').style.setProperty('--range-background', state.color_themes[action.payload.current_theme.state].accentColor)
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