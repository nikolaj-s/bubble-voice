import React from 'react'
import { useSocket } from '../../context/SocketContext';
import { useDispatch } from 'react-redux';
import UserButtonSkeleton from '../../components/ui/Buttons/UserButton/UserButtonSkeleton';
import { addUser, setUsers, updateUser, updateUserChannelStatus, updateUserStatus } from '../../features/ServerUsers/serverUsersSlice';
import { useParams } from 'react-router';

export const ServerUsersProvider = ({children}) => {

    const [status, setStatus] = React.useState('loading');

    const {serverID} = useParams();

    const dispatch = useDispatch();

    const socket = useSocket();

    React.useEffect(() => {

        if (!socket) return;

        const fetchUsers = async () => {

            setStatus('loading');

            await socket.request('fetch users')
            .then(res => {
                console.log(res)
                dispatch(setUsers(res.data));
                setStatus('complete');
                return;
            })
            .catch(error => {
                console.log(error);
                setStatus('error');
                return;
            });

            return;
        }

        const updateUserAccount = (data) => {
            try {
                console.log(data)
                if (data.user_id) {
                    dispatch(updateUser(data));
                }
            } catch(error) {
                console.log(error);
                return;
            }
        }

        const handleUserStatus = (data) => {
            try {
                if (data.user_id) {
                    dispatch(updateUserStatus({
                        user_id: data.user_id,
                        status: data.status
                    }))
                }
            } catch (error) {
                console.log(error);
            }
        }

        const handleUpdateUserChannelStatus = (data) => {
         
            if (data.user_id && data.channel_status) {
                dispatch(updateUserChannelStatus(data));
            }
        }

        const handleUserJoinsServer = (data) => {

            if (data.user_id) {
                dispatch(addUser(data));
            }
        }

        const handleUpdatePermissions = (data) => {
            if (data.user_id) {
                dispatch(updateUser(data));
            }
        }
 
        socket.on(`update permissions for user in ${serverID}`, handleUpdatePermissions);

        socket.on(`user joins ${serverID}`, handleUserJoinsServer);

        socket.on('user updates channel status', handleUpdateUserChannelStatus);

        socket.on(`user account update ${serverID}`, updateUserAccount);

        socket.on(`user status update ${serverID}`, handleUserStatus);

        socket.on('user disconnects', handleUserStatus);

        socket.on('connect', fetchUsers);

        fetchUsers();

        return () => {

            socket.off(`update permissions for user in ${serverID}`, handleUpdatePermissions);

            socket.off(`user joins ${serverID}`, handleUserJoinsServer);

            socket.off('user updates channel status', handleUpdateUserChannelStatus);

            socket.off(`user account update ${serverID}`, updateUserAccount);

            socket.off(`user status update ${serverID}`, handleUserStatus);

            socket.off('user disconnects', handleUserStatus);

            socket.off('connect', fetchUsers);
        }

    }, [socket, dispatch, serverID])

    if (status === 'loading') return [...Array(10)].map((_, index) => (<UserButtonSkeleton key={index} />));

    return (
        <>
        {children}
        </>
    )
}
