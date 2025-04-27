import React from 'react'
import { GalleryDisplay } from '../../ui/GalleryDisplay/GalleryDisplay'

export const GalleryWidget = ({images = []}) => {
    return (
        <GalleryDisplay images={images} />
    )
}
