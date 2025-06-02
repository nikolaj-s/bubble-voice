import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import { useSelector } from 'react-redux'
import { UniversalVideoPlayer } from '../../../components/ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'
import { MediaTooltipWrapper } from '../../../components/ui/Wrappers/MediaTooltipWrapper/MediaTooltipWrapper'

export const ExpandedVideo = ({close}) => {

    const {video} = useSelector(state => state.expandedVideoSlice)

    return (
        <MediaTooltipWrapper media={{...video, type: 'video'}}>
            <UniversalVideoPlayer autoplay={true} src={video.url || video.src} />
        </MediaTooltipWrapper>
    )
}
