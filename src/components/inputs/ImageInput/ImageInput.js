// library's
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, useAnimation } from 'framer-motion'
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// componenents
import { Image } from "../../Image/Image";
import { ImageIcon } from '../../Icons/ImageIcon/ImageIcon';

// style
import "./ImageInput.css";

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
    size = 4000000
}) => {

    // state
    const [files, setFiles] = React.useState([{preview: initalImage}]);

    const animation = useAnimation();

    const iconAnimation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    // handle file drop
    const {getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": ['.jpeg', '.png', '.webp', '.jpg']
        },
        maxFiles: 1,
        onDrop: acceptedFiles => {

            if (acceptedFiles.length === 0) return;

            if (acceptedFiles[0]?.size > size) return getFile({size: size += 1000});

            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }

    })

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
    )
}
