import React from 'react'
import { useSelector } from 'react-redux'
import { selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./VideoPreview.css"

export const VideoPreview = ({video, action}) => {

    const ref = React.useRef();

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div onClick={() => {action(video)}} className='video-preview-container'>
            <video loading="lazy" loop={true} style={{width: '100%'}} src={video.preview} controls={false} autoPlay />
            <p 
            style={{
                backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.7)`,
                color: textColor
            }}
            className='video-preview-title'>{video.title}</p>
        </div>
    )
}
