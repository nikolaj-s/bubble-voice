// librarys
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectCurrentChannel } from '../../../ServerSlice';

// components
import { WidgetPreview } from '../../../../../components/widgets/WidgetPreview/WidgetPreview';

// style
import "./Widgets.css";
import { selectGlassColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';


export const Widgets = () => {

    const channel = useSelector(selectCurrentChannel);

    const glassColor = useSelector(selectGlassColor);

    return (
        <div 
        className='content-outer-container'
       style={{backgroundColor: glassColor}}
        >
            <div className='widget-preview-wrapper'>
                <WidgetPreview widgets={channel.widgets} />
            </div>
        </div>
    )
}
