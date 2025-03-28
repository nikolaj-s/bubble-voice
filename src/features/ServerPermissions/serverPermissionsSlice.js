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
            const permissions = action.payload;

            Object.keys(permissions).forEach((key) => {
                if (permissions[key].admin) {
                    state.permissions[key] = new Proxy({}, {get: () => true})
                } else {
                    state.permissions[key] = permissions[key]
                }
            })
        },
        updatePermission: (state, action) => {

            if (action.payload._id) {
                state.permissions[action.payload._id] = action.payload;
            }

        },
        deletePermission: (state, action) => {
            if (action.payload._id) {
                delete state.permissions[action.payload._id];
            }
        }
    }
})

export const { setPermissions, updatePermission } = serverPermissionsSlice.actions;

export default serverPermissionsSlice.reducer;