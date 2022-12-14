// library's
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// componenents
import { Image } from "../../Image/Image";
import { ImageIcon } from '../../Icons/ImageIcon/ImageIcon';

// style
import "./ImageInput.css";
import { ImageInputProcessingIndicator } from './ImageInputProcessingIndicator/ImageInputProcessingIndicator';

export const ImageInput = ({
    initalImage,
    width = "100%",
    height = "100%",
    borderRadius = "10px",
    center = false,
    zIndex = "0",
    getFile = () => {},
    blur = false,
    blur_amount = 8,
    size = 1000000
}) => {

    // state
    const [files, setFiles] = React.useState([{preview: initalImage}]);

    const [processingImage, toggleProcessingImage] = React.useState(false);

    const [percent, setPercent] = React.useState(0);

    const animation = useAnimation();

    const iconAnimation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

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
            
            const options = {maxSizeMB: 0.6, onProgress: handlePercent, maxIteration: 30, type: acceptedFiles[0].type}

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

        if (files[0]?.size) getFile(files[0]);
        
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line
    }, [files])


    // handle animation's
    const animateEntry = (arg, leaving) => {
        animation.start({
            border: `solid 4px ${arg}`
        })

        if (leaving === false) {
            iconAnimation.start({
                filter: "invert()"
            })
        } else {
            iconAnimation.start({
                filter: "none"
            })
        }
    }

    return (
        <AnimatePresence>
        <motion.div 
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
            width: `calc(${width} - 8px)`,
            height: `calc(${height} - 8px)`,
            position: "absolute",
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: borderRadius,
            border: `4px solid ${primaryColor}`,
            zIndex: zIndex,
            left: "50%" ,
            top: "50%",
            transform: "translate(-50%, -50%)",
        }}
        {...getRootProps({className: 'dropzone'})} className='image-drop-input-container'>
            <input {...getInputProps()} />
            <Image opacity={blur_amount} disableErr={true} cursor='pointer' image={files[0]?.preview} />
            
            <ImageIcon cursor={'pointer'} center={center} zIndex={zIndex} animation={iconAnimation} />
        </motion.div>
        {processingImage ? <ImageInputProcessingIndicator key={"image-processing-indicator"} value={percent} /> : null}
        </AnimatePresence>
    )
}
