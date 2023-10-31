import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import "./ImageOfTheDay.css";
import { Image } from '../../../../../../components/Image/Image';
import { selectAccentColor, selectGlassColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setExpandedContent } from '../../../../../ExpandContent/ExpandContentSlice';

export const ImageOfTheDay = ({imageOfTheDay}) => {

    const dispatch = useDispatch();

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const handleExpand = (d) => {
        dispatch(setExpandedContent(imageOfTheDay.image));
    }
    
    return (
        <div className='image-of-the-day-container'>
            {imageOfTheDay.image ?
            <div 
            style={{backgroundColor: accentColor}}
            className='image-of-the-day-wrapper'>
                <Image minLoadHeight={150} expandContent={handleExpand} cursor='pointer' borderRadius={'5px'} image={imageOfTheDay.preview} />
                <div 
                style={{backgroundColor: glassColor}}
                className='image-info-wrapper'>
                    <p
                    style={{color: textColor}}
                    >This Image Was Found Related To The Query: {(imageOfTheDay.query || imageOfTheDay.tags)}</p>
                </div>
            </div>:
            <div className='no-image-of-the-day'>
                <p style={{color: textColor}} >No Image of The Day Available To Display</p>
            </div>
            }
        </div>
    )
}
