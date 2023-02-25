// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContent } from '../../../../features/ExpandContent/ExpandContentSlice';
import { selectSecondaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectDisableTransparancyEffects } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

// components
import { Image } from '../../../Image/Image';

// style
import "./ImageWidget.css";

export const ImageWidget = ({widget, editing}) => {

    const dispatch = useDispatch();

    const expand = () => {
        dispatch(setExpandedContent(widget.content.text));
    }

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div style={{backgroundColor: disableTransparancyEffects ? secondaryColor : `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`}} onClick={expand} className='image-widget-container' >
            <Image image={widget.content.text} objectFit='contain' />
        </div>
    )
}
