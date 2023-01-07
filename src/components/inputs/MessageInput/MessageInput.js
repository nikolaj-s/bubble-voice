// library's
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

// state
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ImageButton } from './ImageButton/ImageButton';

// style
import "./MessageInput.css";
import { SendButton } from './SendButton/SendButton';
import { CharacterCount } from './CharacterCount/CharacterCount';
import { ProcessingImageIndicator } from './ProcessingImageIndicator/ProcessingImageIndicator';
import { ImageDropListener } from './ImageDropListener/ImageDropListener';
import { SearchImageButton } from './SearchImageButton/SearchImageButton';
import { ImageSearchPanel } from './ImageSearchPanel/ImageSearchPanel';
import { selectHideUserStatus } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectServerId } from '../../../features/server/ServerSlice';

export const MessageInput = ({send, text, keyCode, image, value, persist, updateInputHeight, socialRoute}) => {

    const [files, setFiles] = React.useState([{}])

    const [inputHeight, setInputHeight] = React.useState(60);

    const [processingImage, toggleProcessingImage] = React.useState(false);

    const [percent, setPercent] = React.useState(0)

    const [searchingForImage, toggleSearchingForImage] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const textColor = useSelector(selectTextColor);

    const animation = useAnimation();

    const hideUserStatus = useSelector(selectHideUserStatus);

    const serverId = useSelector(selectServerId);

    const incrementPrecentage = (value) => {
        setPercent(value)
    }

    const {getRootProps} = useDropzone({
        accept: {
            "image/*": ['.jpeg', '.png', '.webp', '.jpg', '.gif']
        },
        maxFiles: 1,
        onDrop: async acceptedFiles => {
            
            if (acceptedFiles.length === 0) return;

            toggleProcessingImage(true);

            const options = {maxSizeMB: 0.6, onProgress: incrementPrecentage, maxIteration: 30}

            let compressed_image;

            if (acceptedFiles[0].type.includes('gif') && acceptedFiles[0].size < 950000) {
                compressed_image = acceptedFiles[0];
            } else {
                compressed_image = await imageCompression(acceptedFiles[0], options);
            }

            setFiles([Object.assign(compressed_image, {preview: URL.createObjectURL(acceptedFiles[0])})])

            toggleProcessingImage(false);
        }

    })

    React.useEffect(() => {
        
        if (files[0].size) image(files[0]);
        
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line
    }, [files])

    const handleText = (e) => {
       
        if (e.target.value.length > 511) return;

        text(e.target.value)

        setInputHeight(e.target.scrollHeight)

        updateInputHeight(e.target.scrollHeight + 20)
    
    }

    const handleKeyCode = (e) => {
        if (keyCode === false || processingImage) {
            return
        }

        if (keyCode === 13) {
            setInputHeight(60); 
            updateInputHeight(80);
        }
        keyCode(e.keyCode)
    }

    const handleSend = () => {

        if (processingImage) return;

        setInputHeight(60)

        updateInputHeight(80)

        send();
    }

    const handleImageButton = () => {
        document.getElementById('image-drop-listener').click();
    }

    const handleSearchingForImageToggle = () => {
        toggleSearchingForImage(!searchingForImage)
    }

    const selectImage = (i) => {
        toggleSearchingForImage(false);

        text(i);

        image({preview: i});
    }

    return (
        <> 
        <AnimatePresence>
            {persist ? <ImageDropListener key={"image-drop-listener"} root={getRootProps({className: 'dropzone'})} /> : null}
            <ImageSearchPanel key="message-image-search-container" serverId={serverId} selectImage={selectImage} searchingForImage={searchingForImage} />
            <motion.div 
            key={"message-text-input"}
            animate={animation}
            style={{
                backgroundColor: primaryColor,
                height: inputHeight,
                borderBottomRightRadius: socialRoute ? 0 : hideUserStatus ? 10 : 0
            }}
            className="message-input-container" >
                <textarea 
                className='text-input'
                style={{
                    color: textColor,
                    width: '100%',
                    resize: 'none',
                    border: 'none',
                }}
                onFocus={handleText}
                id='social-input-selector' onKeyUp={handleKeyCode} onChange={handleText} value={value}  placeholder='Message' type="text" />
                <div className='message-input-button-wrapper'>
                    <CharacterCount count={value.length} />
                    <SearchImageButton margin={!persist ? '0 10px 0 0' : null} action={handleSearchingForImageToggle} />
                    {(persist && !processingImage) ? <ImageButton action={handleImageButton} /> : null}
                    {processingImage ? <ProcessingImageIndicator percent={percent} /> : null}
                    <SendButton color={textColor} action={handleSend} />
                </div>
            </motion.div>
        </AnimatePresence>
        </>
    )
}
