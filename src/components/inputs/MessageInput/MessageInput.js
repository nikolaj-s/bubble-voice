// library's
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

// state
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ImageButton } from './ImageButton/ImageButton';

// style
import "./MessageInput.css";
import { SendButton } from './SendButton/SendButton';
import { ProcessingImageIndicator } from './ProcessingImageIndicator/ProcessingImageIndicator';
import { ImageDropListener } from './ImageDropListener/ImageDropListener';
import { SearchImageButton } from './SearchImageButton/SearchImageButton';
import { ImageSearchPanel } from './ImageSearchPanel/ImageSearchPanel';
import { selectHideUserStatus } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectServerId } from '../../../features/server/ServerSlice';
import { EmojiButton } from '../../buttons/EmojiButton/EmojiButton';
import { EmojiMenu } from '../../EmojiPicker/EmojiMenu';

export const MessageInput = ({send, text, keyCode, image, value, persist, updateInputHeight, socialRoute, direct_message}) => {

    const [files, setFiles] = React.useState([{}])

    const [inputHeight, setInputHeight] = React.useState(40);

    const [processingImage, toggleProcessingImage] = React.useState(false);

    const [percent, setPercent] = React.useState(0)

    const [searchingForImage, toggleSearchingForImage] = React.useState(false);

    const [emojiMenu, toggleEmojiMenu] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const animation = useAnimation();

    const hideUserStatus = useSelector(selectHideUserStatus);

    const serverId = useSelector(selectServerId);

    const iFrames = ['youtu', 'pornhub', 'xvideo', 'twitter', 'reddit', 'vimeo', 'redgif']

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

            const options = {maxSizeMB: 0.6, onProgress: incrementPrecentage, maxIteration: 30, maxWidthOrHeight: 1600}

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
       
        if (e.target.value.length > 1024) return;

        if (e.target.value.length < 5) setInputHeight(40); updateInputHeight(50);

        text(e.target.value)

        setInputHeight(e.target.scrollHeight)

        updateInputHeight(e.target.scrollHeight + 10)
    
    }

    const handleKeyCode = (e) => {
        if (keyCode === false || processingImage) {
            return
        }

        if (e.keyCode === 13) {
            
            setInputHeight(40); 
            updateInputHeight(50);
            
        }
        
        keyCode(e.keyCode)
    }

    const handleSend = () => {

        if (processingImage) return;

        setInputHeight(40)

        updateInputHeight(50)

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

        let frame;
        
        if (i.link) frame = iFrames.some(f => i.link.includes(f));

        text((frame ? i.link : i.image) || i.preview);

        image({preview: i.image});

        
    }

    const handleEmoji = (emoji) => {
        text(value + " " + emoji.emoji)
    }
    
    return (
        <> 
        <AnimatePresence>
            {persist ? <ImageDropListener key={"image-drop-listener"} root={getRootProps({className: 'dropzone'})} /> : null}
            <ImageSearchPanel direct_message={direct_message} close={toggleSearchingForImage} inputHeight={inputHeight} key="message-image-search-container" serverId={serverId} selectImage={selectImage} searchingForImage={searchingForImage} />
            {emojiMenu ? <EmojiMenu direct_message={direct_message} action={handleEmoji} close={() => {toggleEmojiMenu(false)}} /> : null}
            <div
            style={{
                borderBottomRightRadius: socialRoute ? 0 : hideUserStatus ? 10 : 0,
            }}
            className='message-input-wrapper'>
                <motion.div 
                key={"message-text-input"}
                animate={animation}
                style={{
                    backgroundColor: primaryColor,
                    height: inputHeight,
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
                        <div className='message-input-inner-button-wrapper'>
                            <EmojiButton action={() => {toggleEmojiMenu(!emojiMenu)}} desc_space={22} description={'Emoji'} width={18} height={18} padding={8} transparent={true} />
                            <SearchImageButton action={handleSearchingForImageToggle} />
                            {(persist && !processingImage) ? <ImageButton action={handleImageButton} /> : null}
                            {processingImage ? <ProcessingImageIndicator percent={percent} /> : null}
                            <SendButton color={textColor} action={handleSend} />
                        </div>   
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
        </>
    )
}
