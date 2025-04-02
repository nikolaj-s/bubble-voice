import { createPermissionGroup } from "./Thunks/createPermissionGroup";
import { deletePermissionGroup } from "./Thunks/deletePermissionGroup";
import { updatePermissionGroup } from "./Thunks/updatePermissionGroup";

const { createSlice } = require("@reduxjs/toolkit");

const serverPermissionsSlice = createSlice({
    name: "serverPermissionsSlice",
    initialState: {
        permissions: {},
        loading: false,
        error: false,
        currentPermissionGroup: null,
    },
    reducers: {
        setCurrentPermissionGroup: (state, action) => {
            state.currentPermissionGroup = action.payload;
        },
        setPermissions: (state, action) => {

            state.permissions = {};

            const permissions = action.payload;

            Object.keys(permissions).forEach((key) => {
                if (permissions[key].admin) {
                    state.permissions[key] = new Proxy({...permissions[key]}, {get: (target, prop) => {
                        if (prop === '_id' || prop === 'server_id' || prop === 'server_group_name') {
                            return target[prop]
                        }
                        return true;
                    }})
                } else {
                    state.permissions[key] = permissions[key]
                }
            })

        },
        updatePermissions: (state, action) => {

            if (action.payload._id) {

                if (action.payload.admin) {

                    state.permissions[action.payload._id] = new Proxy({...action.payload}, {get: (target, prop) => {

                        if (prop === '_id' || prop === 'server_id' || prop === 'server_group_name') {
                            return target[prop]
                        }
                        
                        return true;
                    }})
                } else {

                    state.permissions[action.payload._id] = action.payload;
                
                }
            }

        },
        deletePermission: (state, action) => {
            if (action.payload.old_server_group_id) {
                delete state.permissions[action.payload.old_server_group_id];
            }
        },
        clearPermissions: (state) => {
            state.permissions = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePermissionGroup.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(updatePermissionGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(updatePermissionGroup.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
        })

        builder.addCase(createPermissionGroup.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(createPermissionGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createPermissionGroup.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
        })
        builder.addCase(deletePermissionGroup.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(deletePermissionGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(deletePermissionGroup.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
        })
    }
})

export const { setPermissions, updatePermissions, setCurrentPermissionGroup, clearPermissions, deletePermission } = serverPermissionsSlice.actions;

export default serverPermissionsSlice.reducer;