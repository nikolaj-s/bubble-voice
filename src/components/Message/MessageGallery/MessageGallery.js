import React from 'react'
import { Image } from '../../Image/Image'
import { SimpleImageCarousel } from '../../SimpleImageCarousel/SimpleImageCarousel'

export const MessageGallery = ({gallery, expand, nsfw}) => {
    return (
        <>
        {gallery ?
        <div className='message-gallery-wrapper'>
            <SimpleImageCarousel nsfw={nsfw} maxWidth={'400px'} images={gallery} expand={expand} />
        </div>
        : null}
        </>
    )
}
