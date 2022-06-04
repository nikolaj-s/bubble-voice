// library's
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, useAnimation } from 'framer-motion'

// componenents
import { Image } from "../../Image/Image";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ImageIcon } from '../../Icons/ImageIcon/ImageIcon';

export const ImageDropInput = ({
    initalImage,
    width = "100%",
    height = "100%",
    borderRadius = "15px",
    center = false,
    zIndex = "0",
}) => {

    // state
    const [files, setFiles] = React.useState([{preview: initalImage}]);

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    // handle file drop
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            "image/*": ['.jpeg', '.png', '.webp', '.jpg']
        },
        maxFiles: 1,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }
    })

    // clear object url to prevent memory leak
    React.useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files])


    // handle animation's
    const animateEntry = (arg) => {
        animation.start({
            filter: `blur(${arg}px)`
        })
    }

    return (
        <motion.div 
        animate={animation}
        transition={{
            duration: 0.01
        }}
        onMouseEnter={() => {
            animateEntry(2);
        }}
        onMouseLeave={() => {
            animateEntry(0);
        }}
        style={{
            width: `calc(${width} - 8px)`,
            height: `calc(${width} - 8px)`,
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
            <Image image={files[0].preview} />
            <ImageIcon center={center} zIndex={zIndex} />
        </motion.div>
    )
}
