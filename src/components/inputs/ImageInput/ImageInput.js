// library's
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// componenents
import { Image as ImageComp } from "../../Image/Image";
import { ImageIcon } from '../../Icons/ImageIcon/ImageIcon';
import {GetImageColorData} from '../../../util/GetImageColorData'


// style
import "./ImageInput.css";
import { ImageInputProcessingIndicator } from './ImageInputProcessingIndicator/ImageInputProcessingIndicator';
import { ImageSearchIcon } from '../../Icons/ImageSearchIcon/ImageSearchIcon';
import { ImageSearchPanel } from '../MessageInput/ImageSearchPanel/ImageSearchPanel';
import { throwServerError } from '../../../features/server/ServerSlice';

export const ImageInput = ({
    initalImage,
    width = "100%",
    height = "100%",
    borderRadius = "5px",
    center = false,
    zIndex = "0",
    backgroundColor,
    getFile = () => {},
    blur = false,
    blur_amount = 8,
    size = 1000000,
    maxSize = 0.6,
    showShadow = false,
    borderWidth = 4,
    maxDimensions = 1920,
    disableIcon = false,
    imageProcessingFontSize,
    getColor = () => {},
    centerButtons = false,
    position = 'absolute',
    contain = false,
    imageCleared,
    listenToClears = false
}) => {
    const dispatch = useDispatch();
    // state
    const [files, setFiles] = React.useState([{preview: initalImage}]);

    const [processingImage, toggleProcessingImage] = React.useState(false);

    const [percent, setPercent] = React.useState(0);

    const [imageSearchOpen, toggleImageSearchOpen] = React.useState(false);

    const animation = useAnimation();

    const iconAnimation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {
        try {
            if (listenToClears) {
                if (!imageCleared.preview) {
                    
                    URL.revokeObjectURL(files[0]?.preview);
    
                    setFiles([{preview: initalImage}])
                }
            }
        } catch (err) {
            return;
        }
        
    }, [imageCleared, listenToClears])

    const handlePercent = (value) => {
        setPercent(value);
    }

    // handle file drop
    const {getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": ['.jpeg', '.png', '.webp', '.jpg', '.gif']
        },
        maxFiles: 1,
        onDrop: async acceptedFiles => {

            if (acceptedFiles.length === 0) return;

            toggleProcessingImage(true);
            console.log(acceptedFiles[0].type)
            const options = {maxSizeMB: maxSize, onProgress: handlePercent, maxIteration: 30, type: acceptedFiles[0].type, maxWidthOrHeight: maxDimensions}

            let compressed_image;

            if (acceptedFiles[0].type.includes('gif') && acceptedFiles[0].size < 950000) {
                compressed_image = acceptedFiles[0];
            } else {
                compressed_image = await imageCompression(acceptedFiles[0], options);
            }
            
            setFiles([Object.assign(compressed_image, {preview: URL.createObjectURL(acceptedFiles[0])})]);

            toggleProcessingImage(false);
        }

    })

    React.useEffect(() => {

        setFiles([{preview: initalImage}]);
        
    // eslint-disable-next-line
    }, [initalImage])

    // clear object url to prevent memory leak
    React.useEffect(() => {
        if (files.length === 0) return;

        if (files[0]?.size || files[0]?.from_search) getFile(files[0]);
        
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line
    }, [files])


    // handle animation's
    const animateEntry = (arg, leaving) => {

        if (leaving === false) {
            iconAnimation.start({
                opacity: 1
            })
            animation.start({
                filter: 'brightness(110%)'
            })
        } else {
            iconAnimation.start({
                opacity: 0.5
            })
            animation.start({
                filter: 'brightness(100%)'
            })
        }
    }

    const onLoad = (e) => {

        if (files[0]?.preview.includes('cloudinary')) return;

        if (files[0]?.from_search) return;

        if (showShadow === false) return;

        setTimeout(() => {

            const color = GetImageColorData(e);

            getColor(color);
        
        }, 500)
            
    }

    const openSearchImageMenu = (e) => {
        e.stopPropagation();
        toggleImageSearchOpen(true)
    }

    const handleSelectImage = async (data) => {
        toggleImageSearchOpen(false);

        await fetch(data.image)
        .then(async response => {

            toggleProcessingImage(true);

            const c_type = response.headers.get('content-type');
            
            const b = await response.blob();

            const file = new File([b], 'profile_image.jpg', {type: c_type});

            const options = {maxSizeMB: maxSize, onProgress: handlePercent, maxIteration: 30, type: file.type, maxWidthOrHeight: maxDimensions}

            let compressed_image = await imageCompression(file, options);

            setFiles([Object.assign(compressed_image, {preview: URL.createObjectURL(file)})]);

            toggleProcessingImage(false);

        }).catch(error => {
            dispatch(throwServerError({error: true, errorMessage: "The Third Party Host Has Blocked The Download of The Selected Image"}))
        })

        



    }

    return (
        <AnimatePresence>
        <motion.div 
        transition={{duration: 0.05}}
        animate={animation}
        onMouseEnter={() => {
            animateEntry(accentColor, false);
        }}
        onMouseLeave={() => {
            animateEntry(primaryColor, true);
        }}
        onMouseDown={() => {
            animateEntry(textColor, false);
        }}
        onMouseUp={() => {
            animateEntry(accentColor, false)
        }}
        style={{
            width: `calc(${width} - 4px)`,
            height: `calc(${height} - 4px)`,
            position: position,
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: borderRadius,
            zIndex: zIndex,
            left: position !== 'absolute' ? null : "50%" ,
            top: position !== 'absolute' ? null :  "50%",
            transform: position !== 'absolute' ? null :  "translate(-50%, -50%)",
            backgroundColor: backgroundColor,
            border: `2px dashed rgba(${textColor.split('rgb(')[1].split(')')[0]}, 0.5)`
        }}
        {...getRootProps({className: 'dropzone'})} className='image-drop-input-container'>
            <input {...getInputProps()} />
            <ImageComp zIndex={2} objectFit={contain ? 'contain' : 'cover'} onLoad={onLoad} opacity={blur_amount} disableErr={true} cursor='pointer' image={files[0]?.preview} />
            {contain ?
            <img className='image-input-contain-blur-effect' src={files[0]?.preview} />
            : null}
            {disableIcon ? null :
            <div 
            style={centerButtons ? 
            {
                top: '50%',
                left: '50%',
                translate: '-50% -50%'
            } :
            {
                top: 10,
                left: 10
            }}
            className='image-input-nav-options-container'>
                <div className='image-input-button-wrapper'>
                    <ImageIcon cursor={'pointer'} center={center} zIndex={zIndex} animation={iconAnimation} />
                </div>
                <h4 style={{color: textColor}}>|</h4>
                <div onClick={openSearchImageMenu} className='image-input-button-wrapper'>
                    <ImageSearchIcon />
                </div>
            </div>
        }
        </motion.div>
        {processingImage ? <ImageInputProcessingIndicator fontSize={imageProcessingFontSize} key={"image-processing-indicator"} value={percent} /> : null}
        {imageSearchOpen ? <ImageSearchPanel selectImage={handleSelectImage} hideOptions={true} close={() => {toggleImageSearchOpen(false)}} searchingForImage={imageSearchOpen} /> : null}
        </AnimatePresence>
    )
}
