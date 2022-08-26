// librarys
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectTextColor, selectPrimaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./ListWidget.css"

export const ListWidget = ({widget, editing}) => {

    const color = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor)

    return (
        <div style={{backgroundColor: color}} className='list-widget-container'>
            {widget.content.text.map((item, key) => {
                return <p style={{color: textColor}} key={item + key}>{item}</p>
            })}
        </div>
    )
}
