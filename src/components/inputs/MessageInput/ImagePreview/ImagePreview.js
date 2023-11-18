import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from '../../../Image/Image';
import { selectTextColor, selectPrimaryColor, selectAccentColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { DeleteButton } from '../../../buttons/DeleteButton/DeleteButton';

export const ImagePreview = ({preview, cancel, inputHeight, fileName, type, processingImage, percent = 0}) => {
    
    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor)

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <>
        
        {preview || processingImage ? 
        <div style={{bottom: inputHeight, backgroundColor: primaryColor}} className='image-social-post-preview'>
            {processingImage ?
            <div style={{backgroundColor: accentColor}} className='compressing-image-container-status-indicator'>
                <h3 style={{color: textColor}}>{percent}%</h3>
            </div>
            :
            <>
            <div 
            style={{backgroundColor: accentColor}}
            className='image-prev-cancel-hover-effect'>
                <DeleteButton description={"Cancel"} action={cancel} width={20} height={20} desc_space={10} padding={4} />
            </div>
            <div className='inner-image-preview-social-wrapper'>
                {preview?.includes('.mp4') || type?.includes('video') ?
                <video style={{height: '100%', borderRadius: '5px'}} src={preview} muted={true}  controls={false}/> :
                <Image borderRadius={'10px'} width='auto' position='relative' objectFit='contain' zIndex={1} image={preview} />
                }
            </div> 
            <p className='image-post-preview-file-name' style={{color: textColor}}>{fileName}</p>
            </>
            }
            
            
            
        </div>
        : null}
        </>
    )
}
