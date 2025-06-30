import React from 'react'
import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper'
import VideoPlayer from '../../../ui/Video/VideoPlayer/VideoPlayer'
import { UniversalVideoPlayer } from '../../../ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'

export const VideoBlock = ({video, nsfw, styles}) => {
    return (
        <>
        {video ?
            <div className={styles.imageBlock} style={{height: 350}}>
                <NsfwWrapper nsfw={{nsfw}}>
                    <UniversalVideoPlayer src={video} />
                </NsfwWrapper>
            </div> 
        : null}
        </>
    )
}
