// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// style
import "./CtxMenuPlaceHolder.css"

export const CtxMenuPlaceHolder = ({name}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div
        className='ctx-menu-placeholder'
        style={{
            backgroundColor: primaryColor
        }}
        >
            <p style={{color: textColor}}>{name}</p>
        </div>
    )
}
