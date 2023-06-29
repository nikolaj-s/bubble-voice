// librarys
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectCurrentChannel } from '../../../ServerSlice';

// components
import { WidgetPreview } from '../../../../../components/widgets/WidgetPreview/WidgetPreview';

// style
import "./Widgets.css";


export const Widgets = () => {

    const channel = useSelector(selectCurrentChannel);

    return (
        <div 
        className='content-outer-container'
       
        >
            <div className='widget-preview-wrapper'>
                <WidgetPreview widgets={channel.widgets} />
            </div>
        </div>
    )
}
