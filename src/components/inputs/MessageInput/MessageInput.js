// library's
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./MessageInput.css";
import { SendButton } from './SendButton/SendButton';
import { ImageDropListener } from './ImageDropListener/ImageDropListener';
import { ImageSearchPanel } from './ImageSearchPanel/ImageSearchPanel';
import { selectHideUserStatus } from '../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { selectServerId, throwServerError } from '../../../features/server/ServerSlice';

import { AddMediaButton } from '../../buttons/AddMediaButton/AddMediaButton';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { InputEditor } from './InputEditor/InputEditor';
import { MembersInChatContainer } from './MembersInChatContainer/MembersInChatContainer';

export const MessageInput = ({handleStatus = () => {}, setFallbackImage, channelId, nsfw, handleNsfw, cancel_image, send, text, keyCode, image, value, persist, updateInputHeight, socialRoute, direct_message, channel_name, setEmoji, setMediaMetaData = () => {}, setVideo}) => {

    const [files, setFiles] = React.useState([{}])

    const [inputHeight, setInputHeight] = React.useState(34);

    const [processingImage, toggleProcessingImage] = React.useState(false);

    const [percent, setPercent] = React.useState(0)

    const [searchingForImage, toggleSearchingForImage] = React.useState(false);

    const [localError, setLocalError] = React.useState(false);

    const [emoji, setLocalEmoji] = React.useState();

    const [focused, toggleFocused] = React.useState(false);

    const [textStyle, setTextStyle] = React.useState({
        fontSize: 16,
        color: null,
        textDecoration: false,
        bold: false,
        fontFamily: 'Inter'
    })

    const dispatch = useDispatch();

    const primaryColor = useSelector(selectPrimaryColor);
    
    const textColor = useSelector(selectTextColor);

    const animation = useAnimation();

    const accentColor = useSelector(selectAccentColor);

    const hideUserStatus = useSelector(selectHideUserStatus);

    const serverId = useSelector(selectServerId);

    const iFrames = ['youtu', 'pornhub', 'xvideo', 'twitter', 'reddit', 'vimeo', 'redgif']

    const incrementPrecentage = (value) => {
        setPercent(value)
    }

    const handleError = (err) => {
        setLocalError(err);

        setTimeout(() => {
            setLocalError(false);
        }, 1500)
    }

    const {getRootProps} = useDropzone({
        accept: {
            "image/*": ['.jpeg', '.png', '.webp', '.jpg', '.gif'],
            "video/*": ['.mp4', '.webm'],
        },
        maxFiles: 1,
        onDrop: async (acceptedFiles, e) => {
            
            if (files[0]?.preview) {
                files.forEach(file => URL.revokeObjectURL(file.preview));

                setFiles([{}]);
            }

            if (acceptedFiles.length === 0) return;

            if (acceptedFiles[0].type.includes('video')) {

                if (acceptedFiles[0].size > 50000000) return dispatch(throwServerError({error: true, errorMessage: "Video File Size Exceeds 50mb"}));

                setFiles([Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})]);

            } else {
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
    
                try {
                    document.getElementById(`social-input-selector-${channelId}`).focus();
                } catch (e) {
                    return;
                }
            }
        }

    })

    React.useEffect(() => {
        
        if (files[0]?.size) image(files[0]);
        
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line
    }, [files])

    const handleText = (e) => {
       
        if (e.target.value.length > 1024) return handleError("Your Message Is Too Long");

        if (e.target.value.length < 5) setInputHeight(40); updateInputHeight(50);

        text(e.target.value)

        setInputHeight(e.target.scrollHeight)

        updateInputHeight(e.target.scrollHeight + 10)

        if (files[0].size) return;

        let imageFormats = ['.png', '.jpeg', '.jpg', '.webp']

        let i = imageFormats.some(format => (e.target.value.includes(format) && e.target.value.includes('redgifs') === false && e.target.value.includes('mp4') === false && e.target.value.includes('https')));
        
        if (i) {
            image({preview: e.target.value});
        } else {
            image({});
        }
    
    }

    const handleEmojiText = (emoji) => {
        if (value.length > 1024) return handleError("Your Message Is Too Long");
        
        text(value + emoji.emoji);

    }

    const handleKeyCode = (e) => {
        if (keyCode === false || processingImage) {
            return
        }

        if (e.keyCode === 13) {
            
            setInputHeight(34); 
            updateInputHeight(42);

            handleCancel();

            toggleFocused(false);

            setTextStyle({
                fontSize: 15,
                color: null,
                textDecoration: false,
                bold: false,
                fontFamily: 'Inter'
            })
            
        }
        
        keyCode(e.keyCode, textStyle);
    }

    const handleSend = () => {

        if (processingImage) return;

        setInputHeight(34)

        updateInputHeight(42)

        setLocalEmoji(null);

        URL.revokeObjectURL(files?.preview);

        send(textStyle);

        handleCancel();

        toggleFocused(false);

        setTextStyle({
            fontSize: 15,
            color: null,
            textDecoration: false,
            bold: false,
            fontFamily: 'Inter'
        })
    }

    const handleImageButton = () => {
        toggleSearchingForImage(false);

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

        setFallbackImage(i.fallback_image);

        image({preview: i?.image?.includes('https') ? i?.image : i?.preview});
        
        setMediaMetaData(i);

        if (i.nsfw) {
            handleNsfw(true);
        }

        setTimeout(() => {
            document.getElementById('social-send-button')?.click();
        }, 100)
    
    }

    const handleSelectVideo = (data) => {

        toggleSearchingForImage(false);

        setVideo(data);

        text(data.url);

        setTimeout(() => {
            document.getElementById('social-send-button')?.click();
        }, 100)
    }

    const handleEmoji = (e) => {

        toggleSearchingForImage(false);

        setLocalEmoji(e);

        setEmoji(e);

        setTimeout(() => {
            document.getElementById('social-send-button')?.click();
        }, 100)
    }

    const handleCancel = () => {
        try {

            URL.revokeObjectURL(files[0]?.preview)

            setFiles([{}]);

            cancel_image();

        } catch (error) {
            console.log(error);
        }
    }

    React.useState(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [])
    
    const updateStyleState = (obj) => {
        setTextStyle(obj);

    //    document.getElementById(`social-input-selector-${channelId}`)?.focus();
    }

    const handleFocus = (value) => {
        if (direct_message) return;

        handleStatus(value);
    }

    return (
        <> 
        <ImageSearchPanel setVideo={handleSelectVideo} channelId={channelId} postEmoji={handleEmoji} persist={persist} upload_image={handleImageButton} direct_message={direct_message} close={toggleSearchingForImage} inputHeight={inputHeight} key="message-image-search-container" serverId={serverId} selectImage={selectImage} searchingForImage={searchingForImage} />
        {localError ? <p className='local-error-alert-social' style={{color: textColor, bottom: inputHeight + 5}}>{localError}</p> : null}
        <AnimatePresence>
            {persist ? <ImageDropListener key={"image-drop-listener"} root={getRootProps({className: 'dropzone'})} /> : null}
            
            <motion.div
            style={{
                backgroundColor: primaryColor,
                borderRadius: 10
            }}
            className='message-input-wrapper'>
                {direct_message ? null : <MembersInChatContainer channelId={channelId} />}
                <ImagePreview processingImage={processingImage} percent={percent} type={files[0]?.type} fileName={files[0]?.name} cancel={handleCancel} preview={files[0]?.preview} />
                <InputEditor handleEmoji={handleEmojiText} updateState={updateStyleState} handleNsfw={handleNsfw} state={textStyle} nsfw={nsfw} />
                <motion.div 
                key={"message-text-input"}
                animate={animation}
                style={{
                    backgroundColor: primaryColor,
                    height: inputHeight,
                    border: `solid 2px ${localError ? 'red' : primaryColor}`
                }}
                className="message-input-container" >
                    <textarea 
                    className='text-input'
                    style={{
                        color: (textStyle.color ||textColor ),
                        textDecoration: textStyle.textDecoration ? 'underline' : null,
                        fontWeight: textStyle.bold ? '600' : null,
                        fontSize: textStyle.fontSize,
                        width: '100%',
                        resize: 'none',
                        border: 'none',
                        fontFamily: textStyle.fontFamily
                    }}
                    onFocus={(e) => {handleText(e); toggleFocused(true); handleFocus(channelId)}}
                    onBlur={() => {handleFocus(null); toggleFocused(false)}}
                    id={`social-input-selector-${channelId}`} onKeyUp={handleKeyCode} onChange={handleText} value={value}  placeholder={channel_name ? `post in #${channel_name}` : 'message'} type="text" />
                    <div className='message-input-button-wrapper'>
                        <div className='message-input-inner-button-wrapper'>
                            
                            <AddMediaButton action={handleSearchingForImageToggle}
                            
                            width={22}
                            height={22}
                            borderRadius={8}
                            description={"Add Media"}
                            zIndex={3}
                            desc_space={18}
                            padding={6} />
                            {value.length > 1 || files[0]?.size || emoji ? <SendButton color={textColor} action={handleSend} /> : null}
                        </div>   
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
        </>
    )
}
