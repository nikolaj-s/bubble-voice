import { useDispatch, useSelector } from 'react-redux'
import { UniversalVideoPlayer } from '../../../components/ui/Video/UniversalVideoPlayer/UniversalVideoPlayer'
import { expandVideo } from '../../../features/Media/ExpandedVideo/expandedVideoSlice'
import { ExpandedMediaWrapper } from '../../../components/ui/Wrappers/ExpandedMediaWrapper/ExpandedMediaWrapper'

export const ExpandedVideo = () => {

    const dispatch = useDispatch();

    const {video} = useSelector(state => state.expandedVideoSlice)

    const close = () => {
        dispatch(expandVideo(null));
    }

    if (!video) return null;

    return (
        <ExpandedMediaWrapper context={{...video, type: 'video'}} onClose={close} >
            <UniversalVideoPlayer autoplay={true} src={video.url || video.src} />
        </ExpandedMediaWrapper>
    )
}
