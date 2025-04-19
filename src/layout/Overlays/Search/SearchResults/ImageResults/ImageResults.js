import React from 'react'

import { NsfwWrapper } from '../../../../../components/ui/Wrappers/NsfwWrapper/NsfwWrapper'

import { ImageComponent } from '../../../../../components/ui/Image/Image'

import { ImageTooltipWrapper } from '../../../../../components/ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper'

import { ImageMasonryWrapper } from '../../../../../components/ui/Wrappers/ImageMasonryWrapper/ImageMasonryWrapper'
import { LongPressGestureWrapper } from '../../../../../components/ui/Gestures/LongPressGestureWrapper'
import { triggerContext } from '../../../../../lib/services/helperFunctions'

export const ImageResults = ({images, id = 'image-grid', send = () => {}}) => {

    return (
        <ImageMasonryWrapper>
            {images.map(image => {
                return (
                <LongPressGestureWrapper key={image.src}  width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, image.src)}}>   
                    <ImageTooltipWrapper 
                        image={image}>
                        <NsfwWrapper 
                        nsfw={{...image}} >
                            <ImageComponent src={image.src.includes('.gif') ? image.src : image.thumbnail} />
                        </NsfwWrapper>
                    </ImageTooltipWrapper>
                </LongPressGestureWrapper> 
                        
                )
            })}
        </ImageMasonryWrapper>
    )
}
