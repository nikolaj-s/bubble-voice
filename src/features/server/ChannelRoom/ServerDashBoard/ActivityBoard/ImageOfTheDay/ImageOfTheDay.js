import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import "./ImageOfTheDay.css";
import { Image } from '../../../../../../components/Image/Image';
import { selectGlassPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setExpandedContent } from '../../../../../ExpandContent/ExpandContentSlice';
import { AltImageIcon } from '../../../../../../components/Icons/AltImageIcon/AltImageIcon';

export const ImageOfTheDay = ({imageOfTheDay}) => {

    const dispatch = useDispatch();

    const glassColor = useSelector(selectGlassPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const handleExpand = (d) => {
        dispatch(setExpandedContent(imageOfTheDay.image));
    }

    const secondaryColor = useSelector(selectSecondaryColor);
    
    return (
        <div 
        style={{backgroundColor: secondaryColor}}
        className='image-of-the-day-container'>
            {imageOfTheDay.image ?
            <>
            <div 
            className='image-of-the-day-wrapper'>
                <Image nsfw={imageOfTheDay.nsfw} zIndex={2} objectFit='contain' minLoadHeight={150} expandContent={handleExpand} cursor='pointer' borderRadius={'10px'} image={imageOfTheDay.image} alt_image={imageOfTheDay.preview} />
                <img alt="BLUR" className='back-drop-blur-image-of-the-day' src={imageOfTheDay.preview} />

                
            </div>
            <div 
            style={{backgroundColor: glassColor}}
            className='image-info-wrapper'>
                <p
                style={{color: textColor}}
                >This Image Was Found Related To The Query: {(imageOfTheDay.query || imageOfTheDay.tags)}</p>
            </div>
            </>
            :
            <div
            style={{backgroundColor: glassColor}}
            className='no-image-of-the-day'>
                <AltImageIcon />
                <p style={{color: textColor}} >No Image of The Day Available To Display</p>
            </div>
            
            }
        </div>
    )
}
