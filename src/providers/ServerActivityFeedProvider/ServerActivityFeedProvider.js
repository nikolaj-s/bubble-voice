import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServerActivityFeed } from '../../features/ServerActivityFeed/Thunks/fetchServerActivityFeed';

export const ServerActivityFeedProvider = ({children}) => {

    const dispatch = useDispatch();

    const {server_id} = useSelector(state => state.server);

    const {loading, error, feed} = useSelector(state => state.activityFeedSlice.feed);

    React.useEffect(() => {

        dispatch(fetchServerActivityFeed());

    }, [dispatch])

    if (loading) return <></>

    if (loading) return <></>

    return (
        <>
        {children}
        </>
    )
}
