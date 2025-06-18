import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServerActivityFeed } from '../../features/ServerActivityFeed/Thunks/fetchServerActivityFeed';
import LoadingSpinnerCard from '../../components/ui/Loading/LoadingSpinnerCard/LoadingSpinnerCard';

export const ServerActivityFeedProvider = ({children}) => {

    const dispatch = useDispatch();

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {loading, error, feed} = useSelector(state => state.serverActivityFeedSlice.feeds[server_id]) || {};

    React.useEffect(() => {

        dispatch(fetchServerActivityFeed({server_id}));

    }, [dispatch, server_id])
  
    if (loading) return <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}><LoadingSpinnerCard /></div>

    if (error) return <></>

    return (
        <>
        {React.cloneElement(children, {feed})}
        </>
    )
}
