import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUserRecommendations } from '../../../../../features/UserRecommendations/Thunks/fetchUserRecommendations';
import { HorizontalMediaScroller } from '../../../../../components/ui/HorizontalMediaScroller/HorizontalMediaScroller';
import NoRecommendationsNotice from '../../../../../components/Misc/NoRecommendationsNotice/NoRecommendationsNotice';

export const SearchRecommendations = ({filter = 'images'}) => {

    const dispatch = useDispatch();

    const {recommendations, status, loading, error} = useSelector(state => state.userRecommendationsSlice);

    React.useEffect(() => {

        if (loading) return;

        if (status === 'idle') {
            dispatch(fetchUserRecommendations());
        }

    }, [status, loading, dispatch])
   
    if (!loading && recommendations.filter(i => filter.includes(i.type)).length === 0) return <NoRecommendationsNotice />

    return (
        <HorizontalMediaScroller media={recommendations.filter(i => filter.includes(i.type))} loading={loading} error={error} title={'Your Recommendations'} />
    )
}
