const { createSlice } = require("@reduxjs/toolkit");


const appearanceSettingsSlice = createSlice({
    name: "appearanceSettingsSlice",
    // inital state is default color scheme
    initialState: {
        primaryColor: "rgb(255, 255, 255)",
        secondaryColor: "rgb(236, 236, 236)",
        accentColor: "rgb(217, 217, 217)",
        textColor: "rgb(0, 0, 0)"
    },
    reducers: {
        updateColorValue: (state, action) => {
            state[action.payload.type] = action.payload.value;
        }
    }
})

// actions
export const {updateColorValue} = appearanceSettingsSlice.actions;

// color selectors
export const selectPrimaryColor = state => state.appearanceSettingsSlice.primaryColor;

export const selectSecondaryColor = state => state.appearanceSettingsSlice.secondaryColor;

export const selectAccentColor = state => state.appearanceSettingsSlice.accentColor;

export const selectTextColor = state => state.appearanceSettingsSlice.textColor;

// export appearance settings reducer
export default appearanceSettingsSlice.reducer;