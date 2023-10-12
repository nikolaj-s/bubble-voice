import React from 'react'

import "./LinkPreview.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../Image/Image';

export const LinkPreview = ({data}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    console.log(data)

    const handleLink = (e) => {
        e.preventDefault();

        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: data.url});

        } catch (err) {
            window.open(data.url)
        }
    }
    return (
        <div 
        style={{
            backgroundColor: primaryColor
        }}
        onClick={handleLink}
        className='link-preview-container'>
            <div className='image-link-preview-wrapper'>
                <Image borderRadius={'5px'} objectFit='contain' cursor='pointer' image={data?.images[0]} />
            </div>
            <div className='link-info-preview-wrapper'>
                <h3 >{data?.title}</h3>
                <p>{data?.description}</p>
            </div>
        </div>
    )
}
