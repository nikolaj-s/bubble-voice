// library's
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Image } from '../../../../Image/Image';

// style
import "./Song.css";

export const Song = ({image, name, duration}) => {

    const textColor = useSelector(selectTextColor);

    const time = (duration / 60).toFixed(2).toString().split('.').join(':')
    
    return (
        <div className='song-container'>
            <div className='song-thumbnail-container'>
                <Image objectFit='cover' image={image} />
            </div>
            <p
            style={{
                color: textColor
            }}
            >{name}</p>
            <p style={{
                color: textColor
            }}>{time}</p>
        </div>
    )
}
