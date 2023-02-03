import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./GalleryTitle.css";

export const GalleryTitle = ({title}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <>
        {title ?
        <div className='gallery-title-container'>
            <h3
            style={{color: textColor}}
            >{title}</h3>
        </div>
        : null}
        </>
    )
}
