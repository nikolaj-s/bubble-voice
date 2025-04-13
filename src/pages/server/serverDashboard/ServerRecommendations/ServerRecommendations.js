import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MediaOfTheDayCard from '../../../../components/MediaOfTheDayCard/MediaOfTheDayCard';
import ErrorAltCard from '../../../../components/Error/ErrorAltCard/ErrorAltCard';
import MediaOfTheDaySkeleton from '../../../../components/MediaOfTheDayCard/MediaOfTheDaySkeleton';
import { fetchServerRecommendations } from '../../../../features/ServerRecommendations/Thunks/fetchServerRecommendations';
import RandomMediaGallery from '../../../../components/RandomMediaGallery/RandomMediaGallery';

export const ServerRecommendations = () => {

    const dispatch = useDispatch();

    const {server_id} = useSelector(state => state.serverDetailsSlice)

    const {loading, error, mediaByServer} = useSelector(state => state.serverRecommendationsSlice);

    const media = mediaByServer[server_id];

    React.useEffect(() => {
        if (!server_id) return;
        
        dispatch(fetchServerRecommendations(server_id));

    }, [server_id, dispatch])

    if (loading) return <MediaOfTheDaySkeleton />

    if (error) return <ErrorAltCard message={error} />

    return [
        <MediaOfTheDayCard key={'media-of-the-day'} {...media?.mediaOfTheDay} media={media?.mediaOfTheDay} />,
        <RandomMediaGallery key={'media-recommendations'} title='Media Recommendations' media={media?.media} />
    ]
}
