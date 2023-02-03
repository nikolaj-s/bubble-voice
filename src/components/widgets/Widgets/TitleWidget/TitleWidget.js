// library
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./TitleWidget.css";

export const TitleWidget = ({widget}) => {

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div style={{backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`}} className='title-widget-container' >
            <h2 style={{color: textColor}} >{widget.content.text}</h2>
        </div>
    )
}
