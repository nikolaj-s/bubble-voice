import React from 'react'

import { NsfwWrapper } from '../../../../../components/ui/Wrappers/NsfwWrapper/NsfwWrapper'

import { ImageComponent } from '../../../../../components/ui/Image/Image'

import { ImageTooltipWrapper } from '../../../../../components/ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper'

import { ImageMasonryWrapper } from '../../../../../components/ui/Wrappers/ImageMasonryWrapper/ImageMasonryWrapper'

export const ImageResults = ({images, id = 'image-grid', send = () => {}}) => {

    return (
        <ImageMasonryWrapper>
            {images.map(image => {
                return (    
                <ImageTooltipWrapper 
                    key={image.src} 
                    image={image}>
                    <NsfwWrapper 
                    nsfw={{...image}} >
                        <ImageComponent src={image.src.includes('.gif') ? image.src : image.thumbnail} />
                    </NsfwWrapper>
                </ImageTooltipWrapper>
                    
                )
            })}
        </ImageMasonryWrapper>
    )
}
