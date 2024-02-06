import React from 'react'

import "./LinkPreview.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../Image/Image';

export const LinkPreview = ({data, expand}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    return (
        <div 
        style={{
            backgroundColor: primaryColor
        }}
        className='link-preview-container'>
            <div className='image-link-preview-wrapper'>
               {data.images.length === 0 ? null : <Image loadingState='eager' expandContent={expand} borderRadius={'20px'} objectFit='contain' cursor='pointer' image={data?.url.includes('amazon') ? data?.images[14] : data?.images[0]} /> }
            </div>
            <div className='link-info-preview-wrapper'>
                <h3 style={{color: textColor}} >{data?.title}</h3>
                <p style={{color: textColor}}>{data?.description}</p>
            </div>
        </div>
    )
}
