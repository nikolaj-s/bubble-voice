// library's
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

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
    borderRadius = "15px",
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

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const handlePercent = (value) => {
        setPercent(value);
    }

    // handle file drop
    const {getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": ['.jpeg', '.png', '.webp', '.jpg']
        },
        maxFiles: 1,
        onDrop: async acceptedFiles => {

            if (acceptedFiles.length === 0) return;

            toggleProcessingImage(true);

            const options = {maxSizeMB: 0.8, onProgress: handlePercent, maxIteration: 20}

            const compressed_image = await imageCompression(acceptedFiles[0], options);
            
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
            transform: "translate(-50%, -50%)"
        }}
        {...getRootProps({className: 'dropzone'})} className='image-drop-input-container'>
            <input {...getInputProps()} />
            <Image image={files[0]?.preview} />
            {blur ? 
            <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                backdropFilter: `blur(${blur_amount}px)`,
                zIndex: 1,
                objectFit: 'contain',
                borderRadius: 10,
                backgroundColor: `rgba(${secondaryColor.split('(')[1]?.split(')')[0]}, 0.4)`
            }}
            ></div>
            : null}
            <ImageIcon center={center} zIndex={zIndex} animation={iconAnimation} />
        </motion.div>
        {processingImage ? <ImageInputProcessingIndicator key={"image-processing-indicator"} value={percent} /> : null}
        </AnimatePresence>
    )
}
