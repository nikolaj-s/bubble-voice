
import { useDispatch } from 'react-redux'
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import { expandVideo } from '../../../../features/Media/ExpandedVideo/expandedVideoSlice';

export const MediaTooltipWrapper = ({media = {}, children}) => {

    const dispatch = useDispatch();

    const expand = () => {
        if (media.type === 'image') {

            dispatch(setExpandedImage({data: media, image: media.src}));

        } else if (media.type === 'video') {
            dispatch(expandVideo(media));

        }
    }

    return (
        <div
        style={{
            cursor: media.type === 'image' ? 'pointer' : null,
            width: '100%',
            height: '100%'
        }}
        data-context={JSON.stringify(media)}
        id={media.src}
        onClick={expand}
        >
            {children}
        </div>
    )
}
