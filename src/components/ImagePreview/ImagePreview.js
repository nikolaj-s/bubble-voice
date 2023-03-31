
import React from 'react';

import "./ImagePreview.css";
import { Image } from '../Image/Image';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ImagePreview = ({image, tags, action, tag_action}) => {
    
    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor)

    return (
        <a onClick={(e) => {e.stopPropagation(); e.preventDefault(); action(image)}} href={image} className='image-preview-result-container'>
            <Image objectFit='cover' hideOnError={true} cursor='pointer' image={image} />
            <div className='image-tags-container'>
                {tags ? tags.map(t => {
                    return <p onClick={(e) => {e.preventDefault(); e.stopPropagation(); tag_action(t)}} style={{color: textColor, backgroundColor: primaryColor}}>{t}</p>
                })
                : null}
            </div>
        </a>
    )
}
