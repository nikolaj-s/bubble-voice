// library
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectDisableTransparancyEffects } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

// style
import "./TitleWidget.css";

export const TitleWidget = ({widget}) => {

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    return (
        <div style={{backgroundColor: disableTransparancyEffects ? secondaryColor : `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`}} className='title-widget-container' >
            <h2 style={{color: textColor}} >{widget.content.text}</h2>
        </div>
    )
}
