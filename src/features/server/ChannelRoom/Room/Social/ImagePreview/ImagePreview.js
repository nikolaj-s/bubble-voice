import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from '../../../../../../components/Image/Image'
import { selectPrimaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ImagePreview = ({preview, cancel, inputHeight}) => {
    
    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <>
        
        {preview ? 
        <div onClick={cancel} style={{bottom: inputHeight, boxShadow: '-10px -10px 30px rgba(0, 0, 0, 0.8)'}} className='image-social-post-preview'>
            <div 
            style={{backgroundColor: primaryColor}}
            className='image-prev-cancel-hover-effect'>
                <svg width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4ZM16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" fill={textColor}/>
            </svg>
            <h2 style={{color: textColor}}>Cancel</h2>
            </div>
            {preview.includes('.mp4') ?
            <video loop={true} style={{width: '100%', height: '100%'}} src={preview} controls={false} autoPlay /> :
            <Image position='relative' objectFit='contain' zIndex={1} image={preview} />
            }
        </div>
        : null}
        </>
    )
}
