import React from 'react'

import {Video} from '../Video/Video';
import {Image} from '../Image/Image';

import "./RedditPost.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SimpleImageCarousel } from '../SimpleImageCarousel/SimpleImageCarousel';

import { NsfwImageOverlay } from '../Image/NsfwImageOverlay/NsfwImageOverlay';
import { selectDisableNsfwBlur } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { Iframe } from '../Iframe/Iframe';

export const RedditPost = ({data = {}, action, disableMax, inSocial}) => {

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const disableBlur = useSelector(selectDisableNsfwBlur)

    const openOriginal = (e) => {
        e.preventDefault();
        let url = "https://www.reddit.com" + data.permalink;
        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: url});

        } catch (err) {
            window.open(url)
        }
    }

    const openAlt = (e) => {
        e.preventDefault();
        let url = data.url;
        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: url});

        } catch (err) {
            window.open(url)
        }
    }
    
    return (
        <div
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        onClick={(e) => {e.preventDefault()}} 
        style={{
            backgroundColor: inSocial ? null : hover ? primaryColor : null,
            padding: inSocial ? 0 : null,
            marginBottom: inSocial ? 5 : null,
            maxWidth: inSocial ? 600 : null,
            borderRadius: inSocial ? 0 : null
        }}
        className='reddit-post-container'>
                <div className='reddit-post-info-container'>
                    <h3 
                    onClick={openOriginal}
                    style={{color: textColor, marginLeft: 0, fontSize: 16, opacity: 0.8}}>{data?.subreddit_name_prefixed}</h3>
                    <div 
                    style={{width: 8, height: 8, borderRadius: '50%',
                    flexShrink: 0, backgroundColor: textColor, opacity: 0.5, margin: '0 8px 0 5px'}}
                    />
                    <p onClick={openAlt} style={{color: textColor}}>{data.domain}</p>
                    
                </div>
                <p className='reddit-post-title' style={{color: textColor, marginBottom: 4}}>{data.title}</p>
                {data.selftext?.length > 1 ?
                <p className='reddit-post-title' style={{color: textColor}} >{data.selftext}</p>
                : null}
                <div className='reddit-media-container'>
                    {data.thumbnail ?
                    <img className='background-blur-red-effect' src={data.thumbnail} />
                    : null}
                    
                    {data?.secure_media_embed && (data.domain.includes('youtu')) ?
                    <Iframe link={data?.secure_media_embed?.media_domain_url} />
                    :
                    data.url.includes('.gifv') || data.url.includes('.mp4') || data.url.includes('redgifs') || data.url.includes('gfycat') || data.media?.reddit_video ? 
                    <Video width={'100%'} height='500px'  backgroundColor={null} objectFit='contain' video={data.url.includes('.gifv') ? data.url.split('.gifv')[0] + '.mp4' : data.preview?.reddit_video_preview?.fallback_url || data.media?.reddit_video?.fallback_url} />
                    : data.gallery_data ?
                    <SimpleImageCarousel expand={action} images={data.gallery_data.items.map(id => `https://i.redd.it/${id.media_id}.jpg`)} />
                    : data.url.includes('.jpg') || data.url.includes('.png') || data.url.includes('.webp') || data.url.includes('.gif') || data.url.includes('.jpeg') ?
                    <Image  height={500} borderRadius={20} expandContent={() => {action(data.url)}} objectFit='contain' cursor='pointer' image={data.url} />
                    : null}
                    {data.over_18 && !disableBlur ?
                    <NsfwImageOverlay /> : null}
                </div>

        </div>
    )
}
