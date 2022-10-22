// library's
import React from 'react'
import { useDispatch } from 'react-redux';
import { setExpandedContent } from '../../../../features/ExpandContent/ExpandContentSlice';

// components
import { Image } from '../../../Image/Image';

// style
import "./ImageWidget.css";

export const ImageWidget = ({widget, editing}) => {

    const dispatch = useDispatch();

    const expand = () => {
        dispatch(setExpandedContent(widget.content.text));
    }

    return (
        <div onClick={expand} className='image-widget-container' >
            <Image image={widget.content.text} objectFit='contain' />
        </div>
    )
}
