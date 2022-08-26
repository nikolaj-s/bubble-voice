// library's
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./PlainTextWidget.css";

export const PlainTextWidget = ({widget, editing}) => {

    const color = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div style={{backgroundColor: color}} className='plain-text-widget-container'>
            <p style={{color: textColor}} >{widget.content.text}</p>
        </div>
    )
}
