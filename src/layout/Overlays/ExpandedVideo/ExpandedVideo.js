import { useSelector } from 'react-redux'
import { UniversalVideoPlayer } from '../../../components/ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'
import { MediaTooltipWrapper } from '../../../components/ui/Wrappers/MediaTooltipWrapper/MediaTooltipWrapper'
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar'
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton'
import { X } from 'lucide-react'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'

export const ExpandedVideo = ({close}) => {

    const {video} = useSelector(state => state.expandedVideoSlice)

    return (
        <>
        <MediaTooltipWrapper media={{...video, type: 'video'}}>
            <UniversalVideoPlayer autoplay={true} src={video.url || video.src} />
        </MediaTooltipWrapper>
        <ToolBar>
            <MediaInfo data={video} />
        </ToolBar>
        </>
    )
}
