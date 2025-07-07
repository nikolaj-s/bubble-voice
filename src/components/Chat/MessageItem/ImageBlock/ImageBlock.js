
import { ImageComponent } from '../../../ui/Image/Image'

import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';

export const ImageBlock = ({image, loading, nsfw, styles, width, height = 350, media_ref = {}}) => {

    const maximumMediaHeight = useSelector(state => state.appearanceSlice.maximumMediaHeight);

    const dispatch = useDispatch();

    const expandImage = () => {

        dispatch(setExpandedImage({image: image, data: media_ref}));

    }
    
    const aspectRatio = width && height ? width / height : undefined;

    return (
        <>
        {image && loading ?
        <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
        : image ?
        <div 
        key={image}
        onClick={expandImage}
        className={styles.imageBlock}>
            <NsfwWrapper nsfw={{nsfw}}>
                <ImageComponent borderRadius={'var(--border-radius)'} width={'auto'} aspectRatio={aspectRatio} height={height > maximumMediaHeight || !height ? maximumMediaHeight : height} src={image} />   
            </NsfwWrapper>
        </div>
        : null}
        </>
    )
}
