import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import { useSelector } from 'react-redux'
import { UniversalVideoPlayer } from '../../../components/ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'

export const ExpandedVideo = ({close}) => {

    const {video} = useSelector(state => state.expandedVideoSlice)

    return (
        <FullScreenWrapper onClose={close}>
            <UniversalVideoPlayer autoplay={true} src={video.url || video.src} />
        </FullScreenWrapper>
    )
}
