
import React from 'react';

import "./ImagePreview.css";
import { Image } from '../Image/Image';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SubMenuButton } from '../buttons/subMenuButton/SubMenuButton';

export const ImagePreview = ({image, tags, action, tag_action}) => {
    
    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor)

    return (
        <div style={{backgroundColor: primaryColor}} onClick={(e) => {e.stopPropagation(); e.preventDefault(); action(image)}} href={image} className='image-preview-result-container'>
            <SubMenuButton target={`image=${image}&tags=${tags}`} zIndex={1} padding={0} width={30} transparent={true} height={30} borderRadius={3} position={'absolute'} />
            <Image img_id={`image=${image}&tags=${tags}`} objectFit='cover' hideOnError={true} cursor='pointer' image={image} />
        </div>
    )
}
