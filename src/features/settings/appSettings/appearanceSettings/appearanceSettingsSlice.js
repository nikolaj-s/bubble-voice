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
        primaryColor: "rgb(57, 62, 70)",
        secondaryColor: "rgb(34, 40, 49)",
        accentColor: "rgb(45, 112, 134)",
        textColor: "rgb(238, 238, 238)",
        activationColor: "rgb(40, 255, 95)",
        glassColor: "rgba(34, 40, 49, 0.4)",
        transparentPrimary: "rgba(57, 62, 70,0)",
        darkModeEnabled: true,
        rgbBackground: false,
        changeMade: false,
        disableServerAmbiance: false,
        useImageBackground: false,
        disableAnimatedTransitions: false,
        gradient: {type: 'none', gradient: false},
        scale: {name: 'default', scale: 0},
        onMacOs: false,
        gradients: [
            {type: 'none', gradient: false},
            {type: "Witching Hour", gradient: 'linear-gradient(to top, #c31432, #240b36)'},
            {type: "Sublime Vivid", gradient: 'linear-gradient(135deg, #fc466b, #3f5efb)'},
            {type: "Blue Lagoon", gradient: 'linear-gradient(to top, #43c6ac, #191654)'},
            {type: "Miaka", gradient: 'linear-gradient(to top, #fc354c, #0abfbc)'},
            {type: "Deep Space", gradient: 'linear-gradient(to bottom, #000000, #434343)'},
            {type: "Neon Life", gradient: 'linear-gradient(to bottom, #b3ffab, #12fff7)'},
            {type: 'Diablo', gradient: 'linear-gradient(to bottom, #870000, #190a05)'},
            {type: 'Starfall', gradient: 'linear-gradient(to bottom, #f0c27b, #4b1248)'},
            {type: 'Topaz', gradient: 'linear-gradient(135deg, hsla(265, 53%, 29%, 1) 0%, hsla(152, 74%, 44%, 1) 49%, hsla(24, 93%, 73%, 1) 100%)'},
            {type: 'Green', gradient: 'linear-gradient(to top, #607e5f, #2e3d2f'},
            {type: "Interstellar", gradient: 'radial-gradient(ellipse at 11% 15%,#16213E, #0F3460, #533483, #E94560)'},
            {type: "Sunset", gradient: 'radial-gradient(ellipse at 11% 15%,#F76E11, #FF9F45, #FFBC80, #FC4F4F)'},
            {type: 'Black Hole', gradient: 'radial-gradient(circle at 50% 50%,#000000, #000000, rgba(179, 76, 51, 1), rgba(0,0,0,1), rgba(0,0,0,1))'},
            {type: "Void", gradient: 'linear-gradient(to top, rgb(0, 0, 0), rgb(0, 0, 0))'},
            {type: "Emerald", gradient: 'linear-gradient(45deg, rgba(69,168,66,1) 19%, rgba(0,232,255,1) 52%, rgba(59,163,66,1) 83%)'}
        ],
        color_themes: {
            default: {
                primaryColor: "rgb(57, 62, 70)",
                secondaryColor: "rgb(34, 40, 49)",
                accentColor: "rgb(45, 112, 134)",
                textColor: "rgb(238, 238, 238)",
                activationColor: "rgb(40, 255, 95)"
            },
            light: {
                primaryColor: "rgb(255, 255, 255)",
                secondaryColor: "rgb(236, 236, 236)",
                accentColor: "rgb(191, 191, 191)",
                textColor: "rgb(64, 64, 64)",
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
                textColor: "rgb(0,0,0)",
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
                secondaryColor: "rgb(111, 84, 73)",
                accentColor: "rgb(232, 177, 115)",
                textColor: "rgb(0, 0, 0)",
                activationColor: "rgb(255, 248, 234)",
            },
            green: {
                primaryColor: "rgb(62, 70, 55)",
                secondaryColor: "rgb(76, 88, 68)",
                accentColor: "rgb(40, 46, 34)",
                textColor: "rgb(255, 255, 255)",
                activationColor: "rgb(58, 235, 52)",
            },
            dusk: {
                primaryColor: "rgb(8, 32, 50)",
                secondaryColor: "rgb(44, 57, 75)",
                accentColor: "rgb(51, 71, 86)",
                textColor: "rgb(255, 255, 255)",
                activationColor: "rgb(255, 76, 41)"
            },
            vintage: {
                primaryColor: "rgb(45, 67, 86)",
                secondaryColor: "rgb(67, 91, 102)",
                accentColor: "rgb(167, 111, 111)",
                textColor: "rgb(250, 240, 228)",
                activationColor: "rgb(255, 76, 41)"
            },
            pastel_dark: {
                primaryColor: "rgb(57, 62, 70)",
                secondaryColor: "rgb(34, 40, 49)",
                accentColor: "rgb(181, 84, 0)",
                textColor: "rgb(238, 238, 238)",
                activationColor: "rgb(255, 76, 41)"
            }
        },
        glass: false,
        current_theme: {label: 'Dark', state: 'dark'},
        theme_options: [{label: "Default", state: 'default'}, {label: 'Dark', state: 'dark'}, {label: 'Light', state: 'light'}, {label: 'Custom', state: 'custom'}, {label: "Fall", state: 'fall'}, {label: "Forest", state: 'forest'}, {label: 'Neon', state: 'neon'}, {label: 'Coffee', state: 'coffee'}, {label: 'Green', state: 'green'}, {label: 'Dusk', state: 'dusk'}, {label: "Vintage", state: 'vintage'}, {label: "Pastel Dark", state: "pastel_dark"}]
    },
    reducers: {
        updateColorValue: (state, action) => {

            state.current_theme = {label: "Custom", state: 'custom'};

            state.changeMade = true;

            state[action.payload.type] = action.payload.value;

            if (action.payload.type === 'accentColor') {
                document.querySelector(':root').style.setProperty('--range-background', state.accentColor)
            }

            if (action.payload.type === 'primaryColor') {
                document.querySelector(':root').style.setProperty('--primary-color', state.primaryColor)

                state.transparentPrimary = `rgba(${state.primaryColor.split('rgb(')[1].split(')')[0]}, 0)`
            }

            if (action.payload.type === 'secondaryColor') {
                state.glassColor = `rgba(${state.secondaryColor.split('rgb(')[1].split(')')[0]}, 0.4)`
            }
        },
        toggleOnMacOs: (state, action) => {
            state.onMacOs = action.payload;
        },
        changeTheme: (state, action) => {

            state.current_theme = action.payload;

            state.primaryColor = state.color_themes[action.payload.state].primaryColor;
            state.secondaryColor = state.color_themes[action.payload.state].secondaryColor;
            state.accentColor = state.color_themes[action.payload.state].accentColor;
            state.textColor = state.color_themes[action.payload.state].textColor;
            state.activationColor = state.color_themes[action.payload.state].activationColor;

            state.glassColor = `rgba(${state.secondaryColor.split('rgb(')[1].split(')')[0]}, 0.4)`

            state.transparentPrimary = `rgba(${state.primaryColor.split('rgb(')[1].split(')')[0]}, 0)`

            document.querySelector(':root').style.setProperty('--range-background', state.color_themes[action.payload.state].textColor)
        
            document.querySelector(':root').style.setProperty('--primary-color', state.color_themes[action.payload.state].primaryColor)
        },
        updateGradient: (state, action) => {
            state.gradient = action.payload;
        },
        updateGlassState: (state, action) => {
            state.glass = !state.glass;
        },
        updateScaleState: (state, action) => {
            state.scale = action.payload;
        },
        updateImageBackgroundState: (state, action) => {
            state.useImageBackground = !state.useImageBackground;
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
                current_theme: state.current_theme,
                rgbBackground: state.rgbBackground,
                gradient: state.gradient,
                glass: state.glass,
                disableServerAmbiance: state.disableServerAmbiance,
                scale: state.scale,
                useImageBackground: state.useImageBackground,
                disableAnimatedTransitions: state.disableAnimatedTransitions
            }

            state.color_themes = {...state.color_themes, custom: new_theme_object.themes.custom};

            saveLocalData("APPEARANCE", "VISUAL", new_theme_object)

        },
        toggleRgbBackGround: (state, action) => {
            state.rgbBackground = !state.rgbBackground;
            state.changeMade = true;
        },
        toggleDisableServerAmbiance: (state, action) => {
            state.disableServerAmbiance = !state.disableServerAmbiance;
        },
        toggleDisableAnimatedTransitions: (state, action) => {
            state.disableAnimatedTransitions = !state.disableAnimatedTransitions;
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
                    
                    state.transparentPrimary = `rgba(${state.primaryColor.split('rgb(')[1].split(')')[0]}, 0)`

                    document.querySelector(':root').style.setProperty('--range-background', state.color_themes[action.payload.current_theme.state].textColor)
                
                    document.querySelector(':root').style.setProperty('--primary-color', state.color_themes[action.payload.current_theme.state].primaryColor)
                }

                if (action.payload.gradient) {
                    state.gradient = action.payload.gradient;
                }

                if (action.payload.rgbBackground) {
                    state.rgbBackground = action.payload.rgbBackground;
                }

                if (action.payload.glass) state.glass = true;

                if (action.payload.disableServerAmbiance) state.disableServerAmbiance = true;

                if (action.payload.useImageBackground) state.useImageBackground = true;

                if (action.payload.disableAnimatedTransitions) state.disableAnimatedTransitions = true;

                state.glassColor = `rgba(${state.secondaryColor.split('rgb(')[1].split(')')[0]}, 0.4)`

                if (action.payload.scale) {
                    state.scale = action.payload.scale;

                    try {
                        const {webFrame} = window.require('electron');
                        console.log(action.payload.scale)
                        webFrame.setZoomLevel(action.payload.scale.scale);
                    } catch (e) {
                        return;
                    }
                }
                return;
            } catch (error) {
                // use system defaults if error thrown
                return;
            }
        },
        [updatePersistedAppTheme.rejected]: (state, action) => {
            return;
        }
    }
})

// actions
export const {toggleOnMacOs, toggleDisableAnimatedTransitions, updateImageBackgroundState, updateScaleState, toggleDisableServerAmbiance, updateGlassState, updateGradient, updateColorValue, changeTheme, saveTheme, toggleRgbBackGround } = appearanceSettingsSlice.actions;

// color selectors
export const selectTransparentPrimaryColor = state => state.appearanceSettingsSlice.transparentPrimary;

export const selectPrimaryColor = state => state.appearanceSettingsSlice.primaryColor;

export const selectSecondaryColor = state => state.appearanceSettingsSlice.secondaryColor;

export const selectAccentColor = state => state.appearanceSettingsSlice.accentColor;

export const selectTextColor = state => state.appearanceSettingsSlice.textColor;

export const selectActivationColor = state => state.appearanceSettingsSlice.activationColor;

export const selectDarkModeEnabledState = state => state.appearanceSettingsSlice.darkModeEnabled;

export const selectCurrentTheme = state => state.appearanceSettingsSlice.current_theme;

export const selectThemeOptions = state => state.appearanceSettingsSlice.theme_options;

export const selectAppearanceChangeMade = state => state.appearanceSettingsSlice.changeMade;

export const selectRgbBackGround = state => state.appearanceSettingsSlice.rgbBackground;

export const selectGradients = state => state.appearanceSettingsSlice.gradients

export const selectGradient = state => state.appearanceSettingsSlice.gradient;

export const selectGlassState = state => state.appearanceSettingsSlice.glass;

export const selectGlassColor = state => state.appearanceSettingsSlice.glassColor;

export const selectServerAmbiance = state => state.appearanceSettingsSlice.disableServerAmbiance;

export const selectScaleState = state => state.appearanceSettingsSlice.scale;

export const selectUseImageBackgroundState = state => state.appearanceSettingsSlice.useImageBackground;

export const selectThemes = state => state.appearanceSettingsSlice.color_themes;

export const selectGlassPrimaryColor = state => {
    return `rgba(${state.appearanceSettingsSlice.primaryColor.split('rgb(')[1].split(')')[0]}, 0.4)`
}

export const selectOnMacOs = state => state.appearanceSettingsSlice.onMacOs;

export const selectDisableTransitionAnimations = state => state.appearanceSettingsSlice.disableAnimatedTransitions;

// export appearance settings reducer
export default appearanceSettingsSlice.reducer;