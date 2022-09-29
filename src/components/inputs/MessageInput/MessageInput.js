// library's
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';

// state
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ImageButton } from './ImageButton/ImageButton';

// style
import "./MessageInput.css";
import { SendButton } from './SendButton/SendButton';
import { CharacterCount } from './CharacterCount/CharacterCount';

export const MessageInput = ({send, text, keyCode, active, image, value, persist}) => {

    const [files, setFiles] = React.useState([{}])

    const primaryColor = useSelector(selectPrimaryColor);
    
    const textColor = useSelector(selectTextColor);

    const animation = useAnimation();

    const {getRootProps} = useDropzone({
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

    React.useEffect(() => {
        
        if (files[0].size) image(files[0]);
        
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line
    }, [files])

    const handleText = (e) => {

        if (e.target.value.length > 255) return;

        text(e.target.value)
    
    }

    const handleKeyCode = (e) => {
        if (keyCode === false) {
            return
        }
        
        keyCode(e.keyCode)
    }

    const handleSend = () => {
        send();
    }

    return (
        <> 
            <motion.div 
            
            animate={animation}
            style={{
                backgroundColor: primaryColor
            }}
            className="message-input-container" >
                <input 
                className='text-input'
                style={{
                    color: textColor
                }}
                onFocus={handleText}
                id='social-input-selector' onKeyUp={handleKeyCode} onChange={handleText} value={value}  placeholder='Message' type="text" />
                <div className='message-input-button-wrapper'>
                    <CharacterCount count={value.length} />
                    {persist ? <ImageButton root={getRootProps({className: 'dropzone'})} /> : null}
                    <SendButton color={textColor} action={handleSend} />
                </div>
            </motion.div>
        </>
    )
}
