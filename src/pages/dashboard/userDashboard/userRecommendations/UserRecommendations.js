import React from 'react'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { ImageMasonryWrapper } from '../../../../components/ui/Wrappers/ImageMasonryWrapper/ImageMasonryWrapper';
import { NsfwWrapper } from '../../../../components/ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { ImageComponent } from '../../../../components/ui/Image/Image';
import { fetchUserRecommendations } from '../../../../features/UserRecommendations/Thunks/fetchUserRecommendations';
import ContentPlaceholder from '../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { MediaTooltipWrapper } from '../../../../components/ui/Wrappers/MediaTooltipWrapper/MediaTooltipWrapper';
import VideoThumbnail from '../../../../components/ui/Video/VideoThumbnail/VideoThumbnail';

export const UserRecommendations = () => {

    const dispatch = useDispatch();

    const {recommendations, status, loading} = useSelector(state => state.userRecommendationsSlice);

    React.useEffect(() => {

        if (loading) return;

        if (status === 'idle') {
            dispatch(fetchUserRecommendations());
        }

    }, [status, loading, dispatch])

    return (
        <LoadingErrorFormWrapper sliceName='userRecommendationsSlice'>
            {status === 'complete' && recommendations.length === 0 &&
            (<ContentPlaceholder
            title={"No recommendations yet—but we’re brewing something magical."}
            message='Dive into media search and unlock a world of hidden gems. Your personalized recommendations are just a click away!'
            />)}
            <ImageMasonryWrapper>
               
                {recommendations.map(media => {
                    return (
                        <MediaTooltipWrapper media={media} key={media.src}>
                            <NsfwWrapper nsfw={media}>
                                {media.type === 'video' ?
                                <VideoThumbnail {...media} width="100%" maxWidth="100%" />
                                :
                                <ImageComponent borderRadius={'var(--border-radius)'} src={media?.src?.includes('gif') ? media.src : media.thumbnail} />
                                }
                            </NsfwWrapper>
                        </MediaTooltipWrapper>
                    )
                })}
            </ImageMasonryWrapper>
        </LoadingErrorFormWrapper>
    )
}
