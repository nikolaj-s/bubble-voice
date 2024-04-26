import React from 'react'
import { TextInput } from '../../../../../../components/inputs/TextInput/TextInput'
import { VideoCard } from '../../../../../../components/VideoCard/VideoCard';
import { useSelector } from 'react-redux';
import { selectVideoResults } from '../ServerMediaSlice';

export const VideoMediaList = () => {

    const [query, setQuery] = React.useState(false);

    const videos = useSelector(selectVideoResults)

    return (
        <div className='video-search-outer-container'>
            {videos.map(video => {
                return <VideoCard key={video.url} data={video} />
            })}
        </div>
    )
}
