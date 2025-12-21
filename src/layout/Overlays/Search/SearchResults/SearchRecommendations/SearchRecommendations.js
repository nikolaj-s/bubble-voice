import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUserRecommendations } from '../../../../../features/UserRecommendations/Thunks/fetchUserRecommendations';
import { HorizontalMediaScroller } from '../../../../../components/ui/HorizontalMediaScroller/HorizontalMediaScroller';
import ContentPlaceholder from '../../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { WandSparkles } from 'lucide-react';
import { setImages } from '../../../../../features/Media/ExpandedImage/expandedImageSlice';

export const SearchRecommendations = ({filter = 'images'}) => {

    const dispatch = useDispatch();

    const {recommendations, status, loading, error} = useSelector(state => state.userRecommendationsSlice);

    React.useEffect(() => {

        if (loading) return;

        if (status === 'idle') {
            dispatch(fetchUserRecommendations());
        }

    }, [status, loading, dispatch])

    const onMediaClick = (item) => {
        if (item.type === 'image') {
            const images = recommendations.filter(m => m.type === 'image').map(m => m.src);

            if (images.length > 0) {
                dispatch(setImages(images));
            }
        }
    }
   
    if (!loading && recommendations.filter(i => filter.includes(i.type)).length === 0) return <ContentPlaceholder icon={WandSparkles} title={"No recommendations just yet..."} message={'Try searching or adding some tags to get things bubbling.'} />

    return (
        <HorizontalMediaScroller onMediaClick={onMediaClick} media={recommendations.filter(i => filter.includes(i.type))} loading={loading} error={error} title={'Your Recommendations'} />
    )
}
