import React from 'react'
import { CarouselGallery } from '../../ui/Wrappers/CarouselGallery/CarouselGallery';
import { ImageComponent } from '../../ui/Image/Image';
import VideoPlayer from '../../ui/Video/VideoPlayer/VideoPlayer';
import SpinnerLoading from '../../ui/Loading/Spinner/SpinnerLoading';
import { useRedditMedia } from '../../../hooks/useRedditMedia';
import { MediaTitle } from '../../ui/Titles/MediaTitle/MediaTitle';
import { Image } from 'lucide-react';
import { NsfwWrapper } from '../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { MediaTooltipWrapper } from '../../ui/Wrappers/MediaTooltipWrapper/MediaTooltipWrapper';

export const DynamicMediaWidget = ({query = "", timeout = 1500}) => {

    const {loading, media} = useRedditMedia(query, timeout);
    console.log(media)
    return (
        <div style={{position: 'relative', overflow: 'hidden', borderRadius: 8}}>
            <MediaTitle icon={Image} title={query} />
            <CarouselGallery>
                {media.map(media => (
                <NsfwWrapper nsfw={media} key={media.src}>
                    <MediaTooltipWrapper media={media}>
                    {{
                        image: <ImageComponent objectFit='contain' {...media} />,
                        video: <VideoPlayer {...media} />
                    }[media.type || null]}
                    </MediaTooltipWrapper>
                </NsfwWrapper>
                ))}
            </CarouselGallery>
            {loading && (<SpinnerLoading />)}
        </div>
        
    )
}
