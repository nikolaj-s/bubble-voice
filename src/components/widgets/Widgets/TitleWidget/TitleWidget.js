// library
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./TitleWidget.css";

export const TitleWidget = ({widget}) => {

    const textColor = useSelector(selectTextColor);

    const color = useSelector(selectPrimaryColor);

    return (
        <div style={{backgroundColor: color}} className='title-widget-container' >
            <h2 style={{color: textColor}} >{widget.content.text}</h2>
        </div>
    )
}
