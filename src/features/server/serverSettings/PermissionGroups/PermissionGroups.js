// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router';

// component's
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { Group } from './Group/Group';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectServerErrorState, selectServerGroups, selectUsersPermissions, throwServerError, updateServerGroups } from '../../ServerSlice';

// socket
import { socket } from '../../ServerBar/ServerBar';

const Wrapper = () => {

    const dispatch = useDispatch();

    const [localPermissions, setLocalPermissions] = React.useState([])

    const [updated, toggleUpdated] = React.useState(false);

    const [newServerGroupName, setNewServerGroupName] = React.useState('');

    const [loading, toggleLoading] = React.useState(false);

    const serverPermissions = useSelector(selectServerGroups);

    const userPermissions = useSelector(selectUsersPermissions);

    const error = useSelector(selectServerErrorState);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Permission Groups"))

        setLocalPermissions([...serverPermissions])

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [serverPermissions])

    const editGroup = (id, permission) => {

        let perms = localPermissions
        
        perms = perms.map(perm => {
            
            if (perm._id === id) {
                return {
                    ...perm,
                    [permission]: !perm[permission]
                }
            } else {
                return perm
            }
        })

        setLocalPermissions(perms);

        toggleUpdated(true);
    }

    const handleCancel = () => {

        toggleUpdated(false);

        setLocalPermissions(serverPermissions);

    }

    const pushNewServerGroup = () => {

        const perms = localPermissions;

        if (newServerGroupName.length < 4) return dispatch(throwServerError({errorMessage: "Server Group Name Must Be Longer Than 4 Characters"}))

        for (const perm of perms) {
            if (perm.server_group_name.toLowerCase() === newServerGroupName.toLowerCase()) {
                
                return dispatch(throwServerError({errorMessage: "Server Group With That Name Already Exists"}));
            
            }
        }

        const obj = {
            _id: String(Math.random(200 * 5)) + 'new server group',
            server_group_name: newServerGroupName,
            user_can_view_channel_content: false,
            user_can_post_channel_social: false,
            user_can_manage_channels: false,
            user_can_manage_server_groups: false,
            user_can_kick_user: false,
            user_can_ban_user: false,
            user_can_edit_server_banner: false,
            user_can_edit_server_name: false,
            user_can_edit_server_password: false,
            user_can_create_channels: false,
            user_can_delete_channels: false,
            user_can_create_server_groups: false,
            user_can_delete_server_groups: false,
            user_can_delete_other_users_messages: false,
            user_can_move_users: false
        }

        perms.push(obj)

        toggleUpdated(true);
        setNewServerGroupName("");
        setLocalPermissions(perms);
    
    }

    const handleNewServerGroupName = (value) => {
        setNewServerGroupName(value);
    }

    const handleSaveChanges = async () => {

        toggleLoading(true);

        await socket.request('update server groups', {groups: localPermissions})
        .then(data => {
            toggleLoading(false);
            toggleUpdated(false);
            dispatch(updateServerGroups(data.data));
        })
        .catch(error => {
            console.log(error)
            toggleLoading(false);
            dispatch(throwServerError({errorMessage: error}));
        })

    }

    const handleDelete = (id) => {

        let perms = localPermissions;

        perms = perms.map(perm => {
            if (perm._id === id) {
                return {
                    ...perm,
                    delete: true
                }
            } else {
                return perm;
            }
        })

        setLocalPermissions(perms)

        toggleUpdated(true);
    }

    return (
        <>
        {userPermissions?.user_can_manage_server_groups ?
        localPermissions.map((permission, key) => {
            return (
                permission.server_group_name === 'Owner' ? null :
                <Group userPermissions={userPermissions} handleDelete={handleDelete} key={permission.server_group_name + key} action={editGroup} permission={permission} />
            )
        }):
        <NotAuthorizedMessage />
        }
        {
        userPermissions?.user_can_create_server_groups ?
        <>
        <InputTitle title={"Create Permission Group"} />
        <TextInput marginBottom='2%' action={handleNewServerGroupName} placeholder={"Permission Group Name"} inputValue={newServerGroupName}  />
        <TextButton action={pushNewServerGroup} name={"Create"} />
        {updated ? <ApplyCancelButton cancel={handleCancel} apply={handleSaveChanges} /> : null}
        <SettingsSpacer />
        </>
        : null}
        <Loading loading={loading} error={error} />
        </>
    )
}


export const PermissionGroups = () => useRoutes([
    {path: "permission-groups", element: <Wrapper />}
])
