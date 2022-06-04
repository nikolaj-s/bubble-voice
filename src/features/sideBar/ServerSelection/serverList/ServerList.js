// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { ServerButton } from '../../../../components/buttons/ServerButton/ServerButton';
import { LoadingSpinner } from '../../../../components/LoadingComponents/LoadingSpinner/LoadingSpinner';
import { selectLoadingUsersServersState, selectServerList } from '../../sideBarSlice';

// style's
import "./ServerList.css";

export const ServerList = ({selectServer}) => {

    const loadingUserServerListState = useSelector(selectLoadingUsersServersState);

    const serverList = useSelector(selectServerList);

    return (
        <div className='server-list-container'>
            {loadingUserServerListState ? 
            <LoadingSpinner /> : 
            serverList.map(servers => {
                return <ServerButton action={selectServer} key={servers._id} {...servers} />
            })
            }
        </div>
    )
}
