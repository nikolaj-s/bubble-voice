import React from 'react'
import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper'
import { UniversalVideoPlayer } from '../../../ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'
import VideoPlayer from '../../../ui/Video/VideoPlayer/VideoPlayer'

export const VideoBlock = ({video, thumbnail, duration, media_title, color, nsfw, styles}) => {
    
    return (
        <>
        {video ?
            <div className={styles.imageBlock} style={{height: 350, minWidth: 200}}>
                <NsfwWrapper nsfw={{nsfw}}>
                    <VideoPlayer title={media_title} thumbnail={thumbnail} DURATION={duration} src={video} color={color}/>
                </NsfwWrapper>
            </div> 
        : null}
        </>
    )
}
