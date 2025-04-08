const { createSlice } = require("@reduxjs/toolkit")

const mobileSlice = createSlice({
    name: "mobileSlice",
    initialState: {
        isUserMenuOpen: false,
        isChannelMenuOpen: false,
        isServerMenuOpen: false
    },
    reducers: {
        toggleMobileMenu: (state, action) => {
            const key = action.payload;
            
            const wasOpen = state[key];
          
            // Reset all
            for (let menu in state) {
              state[menu] = false;
            }
          
            // Reopen only if it was not already open
            if (!wasOpen) {
              state[key] = true;
            }
          }
          
    }
})

export const {toggleMobileMenu} = mobileSlice.actions;

export default mobileSlice.reducer;