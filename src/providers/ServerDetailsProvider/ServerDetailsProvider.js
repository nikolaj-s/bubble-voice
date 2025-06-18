
import React from 'react'

import { useSocket } from '../../context/SocketContext'

import { useDispatch, useSelector } from 'react-redux';

import { selectServerDetailsStatus, setServerDetails, setServerDetailsStatus } from '../../features/ServerDetails/serverDetailsSlice';

import DashboardSkeleton from '../../components/ui/Loading/DashBoardSkeleton/DashBoardSkeleton';

import { useNavigate, useParams } from 'react-router';

import { deletePermission, setPermissions, updatePermissions } from '../../features/ServerPermissions/serverPermissionsSlice';

import { removeServerGroupFromUsers } from '../../features/ServerUsers/serverUsersSlice';

export const ServerDetailsProvider = ({children}) => {

    const navigate = useNavigate();

    const {serverID} = useParams();

    const socket = useSocket();

    const dispatch = useDispatch();

    const status = useSelector(selectServerDetailsStatus);

    const [showLoading, toggleShowLoading] = React.useState(false);

    React.useEffect(() => {

        if (!serverID) return;

        if (!socket) return;

        const handleFetchServerDetails = async () => {

            dispatch(setServerDetailsStatus('loading'));

            setTimeout(async () => {
                const data = await socket.request('fetch server details', {server_id: serverID})
                .then(res => res)
                .catch(error => {
                    console.log(error);
                    if (error === "Server Not Found") {
                        navigate('/dashboard/not-found')
                    } else {
                        navigate('/dashboard/not-found')
                    }

                    return {error: true}
                });
                
                if (data.details) {

                    dispatch(setServerDetails(data.details));

                }

                if (data.permissions) {
                    dispatch(setPermissions(data.permissions));
                }
            }, 10)
                

            return;
        }

        const handleServerDetailsUpdate = (data) => {

            if (data.server_id) {
                dispatch(setServerDetails(data));
            }
        }
        
        const handlePermissionGroupUpdate = (data) => {
            console.log(data)
            if (data._id) {
                dispatch(updatePermissions(data));
            }
        }

        const handleRemoveServerGroup = (data) => {
            if (data.old_server_group_id && data.new_server_group_id) {
                dispatch(removeServerGroupFromUsers(data));

                dispatch(deletePermission(data));
            }
        }

        const setServerDisconnectStatus = () => {
            dispatch(setServerDetailsStatus('disconnected'));
        }

        socket.on(`update permission group for ${serverID}`, handlePermissionGroupUpdate);

        socket.on(`remove server group from ${serverID}`, handleRemoveServerGroup);

        socket.on(`update server details for ${serverID}`, handleServerDetailsUpdate);

        socket.on('disconnect', setServerDisconnectStatus);

        socket.on('connect', handleFetchServerDetails);

        handleFetchServerDetails();

        return () => {

            socket.off(`remove server group from ${serverID}`, handleRemoveServerGroup);

            socket.off(`update permission group for ${serverID}`, handlePermissionGroupUpdate);

            socket.off(`update server details ${serverID}`, handleServerDetailsUpdate);

            socket.off('connect', handleFetchServerDetails);

            socket.off('disconnect', setServerDisconnectStatus);

          //  dispatch(resetServerDetails());
        
        }

    // eslint-disable-next-line
    }, [socket, serverID, dispatch])


    React.useEffect(() => {

        let timer;

        if (status === 'loading') {
            timer = setTimeout(() => {

                toggleShowLoading(true)
            }, 2000)
        } else {
            clearTimeout(timer);
            toggleShowLoading(false);
        }

        return () => clearTimeout(timer);

    }, [status])

    
    if (status === 'idle') {

        return <></>

    } else if (status === 'loading' && showLoading) {

        return showLoading ? <DashboardSkeleton key="dashboard-loader" alt={true} /> : null

    } else {

        return (
            <>
                {children}
            </>
        )
    }
    
}
