const { createSlice } = require("@reduxjs/toolkit");


const serverPermissionsSlice = createSlice({
    name: "serverPermissionsSlice",
    initialState: {
        permissions: {},
        loading: false,
        error: false,
    },
    reducers: {
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
    }
})

export const { setPermissions } = serverPermissionsSlice.actions;

export default serverPermissionsSlice.reducer;