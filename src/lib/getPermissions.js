

export const getPermissions = (getState) => {
    try {

        const {_id} = getState().accountSlice.account;

        const member = getState().serverUsersSlice.users[_id];

        const server_group = getState().serverPermissionsSlice.permissions[member.server_group];

        return server_group;

    } catch (err) {
        return {};
    }
}