import React from 'react'
import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper'
import { UniversalVideoPlayer } from '../../../ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'

export const VideoBlock = ({video, nsfw, styles}) => {
    return (
        <>
        {video ?
            <div className={styles.imageBlock} style={{height: 350, minWidth: 200}}>
                <NsfwWrapper nsfw={{nsfw}}>
                    <UniversalVideoPlayer src={video} />
                </NsfwWrapper>
            </div> 
        : null}
        </>
    )
}
