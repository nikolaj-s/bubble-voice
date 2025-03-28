import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { NsfwWrapper } from '../../../ui/Wrappers/NsfwWrapper/NsfwWrapper'
import { ImageComponent } from '../../../Image/Image'
import { ImageTooltipWrapper } from '../../../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper'

export const ImageGrid = ({images, id = 'image-grid', send = () => {}}) => {

    React.useEffect(() => {

        return () => {
            if (!id) return;

            document.getElementById(id)?.querySelectorAll('img')?.forEach(img => {
                img.src = "";
            })
        }

    }, [id])

    return (
        <ResponsiveMasonry 
        id={id}
        style={{maxWidth: 'calc(100% - 10px', margin: '5px'}}
        columnsCountBreakPoints={{500: 1, 700: 2, 1000: 3}}
        gutterBreakPoints={{500: '3px'}}
        >
            <Masonry gutter='2px'>
                {images.map(image => {
                    return (
                        <div key={image.src} style={{width: '100%', height: '100%', borderRadius: '5px', overflow: 'hidden'}}>
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
