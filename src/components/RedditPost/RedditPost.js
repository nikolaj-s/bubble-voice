import React from 'react'

import {Video} from '../Video/Video';
import {Image} from '../Image/Image';

import "./RedditPost.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SimpleImageCarousel } from '../SimpleImageCarousel/SimpleImageCarousel';

export const RedditPost = ({data, action}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor)

    return (
        <a href={data.url.includes('.gifv') || data.url.includes('.mp4') || data.url.includes('redgifs') ? data.preview?.reddit_video_preview?.fallback_url : data.url} onClick={(e) => {e.preventDefault()}} className='reddit-post-container'>

                <div className='reddit-media-container'>
                {data.selftext?.length > 1 ?
                <p style={{color: textColor}} >{data.selftext}</p>
                :
                data.url.includes('.gifv') || data.url.includes('.mp4') || data.url.includes('redgifs') || data.url.includes('gfycat') || data.media?.reddit_video ? 
                <Video video={data.preview?.reddit_video_preview?.fallback_url || data.media?.reddit_video?.fallback_url} />
                : data.gallery_data ?
                <SimpleImageCarousel expand={action} images={data.gallery_data.items.map(id => `https://i.redd.it/${id.media_id}.jpg`)} />
                : 
                <Image expandContent={() => {action(data.url)}} objectFit='contain' cursor='pointer' image={data.url} />
                }
                </div>
                <div style={{backgroundColor: primaryColor}} className='reddit-post-info-container'>
                    <h3 style={{color: textColor}}>{data.title}</h3>
                    <p style={{color: textColor}}>{data.subreddit_name_prefixed}</p>
                </div>

        </a>
    )
}
