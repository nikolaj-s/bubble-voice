
import { ImageComponent } from '../../../ui/Image/Image'

import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import LazyImageWrapper from '../../../ui/Wrappers/LazyImageWrapper/LazyImageWrapper';

export const ImageBlock = ({image, loading, nsfw, styles, width, height = 350}) => {

    const dispatch = useDispatch();

    const expandImage = () => {

        dispatch(setExpandedImage({image: image}));

    }
    
    const aspectRatio = width && height ? width / height : undefined;

    return (
        <>
        {image && loading ?
        <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
        : image ?
        <div 
        onClick={expandImage}
        className={styles.imageBlock}>
            <NsfwWrapper nsfw={{nsfw}}>
                
                    <ImageComponent borderRadius={'var(--border-radius)'} width={'auto'} aspectRatio={aspectRatio} height={height > 350 || !height ? 350 : height} src={image} />
               
            </NsfwWrapper>
        </div>
        : null}
        </>
    )
}
