// library's
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Image } from '../../../../Image/Image';

// style
import "./Song.css";

export const Song = ({image, name}) => {

    const textColor = useSelector(selectTextColor);

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
        </div>
    )
}
