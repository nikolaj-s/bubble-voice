// library's
import React from 'react'

// components
import { Image } from '../../../Image/Image';

// style
import "./ImageWidget.css";

export const ImageWidget = ({widget, editing}) => {
    return (
        <div className='image-widget-container' >
            <Image image={widget.content.text} objectFit='contain' />
        </div>
    )
}
