import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { NsfwWrapper } from '../../../../../components/ui/Wrappers/NsfwWrapper/NsfwWrapper'
import { ImageComponent } from '../../../../../components/ui/Image/Image'
import { ImageTooltipWrapper } from '../../../../../components/ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper'
import { useDispatch } from 'react-redux'
import { setExpandedImage } from '../../../../../features/Media/ExpandedImage/expandedImageSlice'
import { setOverlay } from '../../../../../features/Overlay/overlaySlice'

export const ImageGrid = ({images, id = 'image-grid', send = () => {}}) => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        return () => {
            if (!id) return;

            document.getElementById(id)?.querySelectorAll('img')?.forEach(img => {
                img.src = "";
            })
        }

    }, [id])

    const expand = (data) => {

        dispatch(setExpandedImage({data, image: data.src}));

        dispatch(setOverlay("expandImage"));

    }

    return (
        <ResponsiveMasonry 
        id={id}
        style={{maxWidth: 'calc(100% - 10px'}}
        columnsCountBreakPoints={{500: 1, 700: 2, 1000: 3}}
        gutterBreakPoints={{500: '3px'}}
        >
            <Masonry gutter='2px'>
                {images.map(image => {
                    return (
                        <div onClick={() => {expand(image)}} key={image.src} style={{width: '100%', height: '100%', borderRadius: '5px', overflow: 'hidden'}}>
                            <NsfwWrapper nsfw={{...image}} >
                                <ImageTooltipWrapper image={image}>
                                    <ImageComponent src={image.src.includes('.gif') ? image.src : image.thumbnail} />
                                </ImageTooltipWrapper>
                            </NsfwWrapper>
                        </div>
                    )
                })}
            </Masonry>
        </ResponsiveMasonry>
    )
}
