import React from 'react'
import { Image } from '../../Image/Image'

export const MessageGallery = ({gallery, expand}) => {
    return (
        <>
        {gallery ?
        <div className='message-gallery-wrapper'>
           
                {gallery.map(i => {
                    return (
                    <div className='message-gallery-image-container'>
                        <Image altHeight='500px'  cursor='pointer' imgHeight='auto' width={null} altWidth='100%' expandContent={expand} objectFit='contain'  key={i} image={i} />
                    </div>
                    )
                })}
        </div>
        : null}
        </>
    )
}
