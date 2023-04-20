import React from 'react'

import "./SubRedditButton.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const SubRedditButton = ({data, action, selected}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    return (
        <div onClick={() => {action(data)}} style={{backgroundColor: data.banner_background_color || primaryColor, backgroundImage: `url(${data.banner_img || data.banner_background_image})`, filter: selected ? `brightness(150%)` : null, cursor: selected ? 'default' : 'pointer', border: selected ? `solid 2px ${textColor}` : null, width: selected ? `calc(32% - 4px)` : null, height: selected ? 196 : null}} className='sub-reddit-button-container'>
            <div style={{backgroundColor: accentColor}} className='sub-reddit-icon-container'>
                {data.icon_img ? <img src={data.icon_img || data.community_icon} className='sub-reddit-icon-image'  /> : <h1 style={{color: textColor}}>R/</h1>}
            </div>
            <h3 style={{color: textColor, backgroundColor: primaryColor}}>{data.title}</h3>
        </div>
            
    )
}
