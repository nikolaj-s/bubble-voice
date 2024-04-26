import React from 'react';

import "./VideoCard.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { CopyButton } from '../buttons/CopyButton/CopyButton';
import { setExpandedContent, setMetaData } from '../../features/ExpandContent/ExpandContentSlice';

export const VideoCard = ({data = {}, send = () => {}, altAction, message}) => {

    const [hover, toggleHover] = React.useState(false);

    const dispatch = useDispatch();

    const textColor = useSelector(selectTextColor);
    
    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {

        if (!data.video_preview) return;

        const video_el = document.getElementById(data.video_preview);

        if (video_el) {
            if (hover) {
                video_el.play();
            } else {
                video_el.pause();
                video_el.currentTime = 0;
                video_el.load();
            }
        }

    }, [hover]);

    const openLink = () => {
        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: data.url});

        } catch (err) {
            window.open(data.url)
        }
    }

    const open = () => {
        if (altAction) {
            send(data);
        } else {
            dispatch(setExpandedContent(data.url));
            dispatch(setMetaData(data));
        }
        
    }

    const copyLink = () => {
        try {
            const { clipboard } = window.require('electron');

            clipboard.writeText(data.url);
        } catch (err) {
            return;
        }
    }

    return (
        <div 
        onClick={open}
        style={{
            backgroundColor: hover ? accentColor : primaryColor
        }}
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        className='video-card-outer-container'>
            <div className='video-card-thumbnail-container'>
                {data.video_preview ?
                <video 
                id={data.video_preview}
                controls={false}
                playsInline={true}
                muted={true}
                
                src={data.video_preview}
                poster={data.thumbnail}
                />
                :
                <img src={data.thumbnail} />
                }
            </div>
            <div className='video-card-details-container'>
                <h3 style={{color: textColor}}>{data.title}</h3>
                <div onClick={(e) => {e.stopPropagation(); openLink()}} className='copy-video-card-link-container'>
                    <p style={{color: textColor, margin: 0, opacity: 0.8}}>{data.url.split('/')[2]}</p>
                </div>
                <p style={{color: textColor}}>{data.duration}</p>
                {message ? null : <div
                onClick={(e) => {e.stopPropagation()}}
                style={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2
                }}
                >
                    <CopyButton  padding={4} width={20} height={20} />
                </div>}
                
            </div>       
        </div>
    )
}
