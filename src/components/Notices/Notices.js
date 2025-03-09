import React from 'react'
import { NoServersNotice } from './NoServersNotice/NoServersNotice'
import { useDispatch, useSelector } from 'react-redux'
import { selectServers } from '../../features/Servers/serversSlice'
import { setOverlay } from '../../features/Overlay/overlaySlice'
import { setFilter } from '../../features/Search/searchSlice'

export const Notices = () => {

    const dispatch = useDispatch();

    const servers = useSelector(selectServers);

    const handleToggleOpenSearchForServers = () => {

        dispatch(setFilter('servers'));

        dispatch(setOverlay('search'));
    
    }

    const handleToggleOpenCreateServerMenu = () => {

        dispatch(setOverlay('createServer'));

    }

    return (
        <>
        {servers.length === 0 ?
        <NoServersNotice createServer={handleToggleOpenCreateServerMenu} joinServer={handleToggleOpenSearchForServers} />
        : null}
        </>
    )
}
