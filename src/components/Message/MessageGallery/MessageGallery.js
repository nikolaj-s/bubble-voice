import React from 'react'
import { Image } from '../../Image/Image'
import { SimpleImageCarousel } from '../../SimpleImageCarousel/SimpleImageCarousel'

import "./MessageGallery.css";

export const MessageGallery = ({gallery, expand, nsfw}) => {

    const [expanded, toggleExpanded] = React.useState(false);

    const [hover, toggleHover] = React.useState(false);

    const handleExpand = (image) => {
        if (!expanded) return;

        expand(image)
    }

    return (
        <>
        {gallery ?
        <div 
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        style={{display: expanded ? 'flex' : 'inline-block', padding: expanded ? '4px 0px' : null}}
        className='message-gallery-wrapper'>
            {gallery.slice(0, 3).map((image, key) => {
                return (
                    <div 
                    onClick={() => {toggleExpanded(true)}}
                    style={{
                        rotate: expanded ? null :  key * (hover ? 10 : 5) + 'deg',
                        left: expanded ? null :  key * (hover ? 30 : 15),
                        top: expanded ? null :  (key * 5) + 10,
                        position: expanded ? null : 'absolute',
                        zIndex: expanded ? null :  key === 0 ? 2 : key === 1 ? 1 : 0,
                        boxShadow: expanded ? null :  '5px 5px 20px rgba(0, 0, 0, 0.5)',
                        height: expanded ? 'auto' : 350,
                        width: expanded ? null : 200
                    }}
                    className='message-image-gallery-container'>
                        <Image width='auto' height='100%' expandContent={handleExpand} cursor='pointer' objectFit={expanded ? 'contain' : 'cover'} borderRadius={20} image={image} />
                    </div>
                )
                
            })}
        </div>
        : null}
        </>
    )
}
