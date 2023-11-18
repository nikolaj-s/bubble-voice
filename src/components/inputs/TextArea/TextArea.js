// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { EmojiButton } from '../../buttons/EmojiButton/EmojiButton';

// style
import "./TextArea.css";
import { EmojiMenu } from '../../EmojiPicker/EmojiMenu';

export const TextArea = ({action = () => {}, placeHolder, inputValue = "", margin, height, maxLength = 1024}) => {

    const animation = useAnimation();

    const color = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const [emojiOpen, toggleEmojiOpen] = React.useState(false);

    const handleAnimation = (color) => {
        animation.start({
            border: `3px solid ${color}`
        })
    }

    const returnInputValue = (e) => {
        action(e.target.value);
    }

    return (
        <>
        <motion.div
        animate={animation}
        className='text-area-container'
        style={{border: `3px solid ${color}`, height: height,backgroundColor: color}}
        onBlur={() => {handleAnimation(color)}}
        onFocus={() => {handleAnimation(textColor)}}
        onMouseOver={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(accentColor)
            }
        }}
        onMouseOut={(e) => {
            if (e.currentTarget.children[0] !== document.activeElement) {
                handleAnimation(color)
            }
        }}
        >
            <textarea 
            onBlur={returnInputValue}
            onChange={returnInputValue} style={{color: textColor, backgroundColor: color}} placeholder={placeHolder} value={inputValue} />
            <p className='text-area-character-counter' style={{color: textColor}}>{inputValue?.length} / {maxLength} </p>
            <div className='emoji-button-textarea-container'>
                <EmojiButton  action={() => {toggleEmojiOpen(!emojiOpen)}} description={'Emojis'} width={20} height={20} />
            </div>
            {emojiOpen ? <EmojiMenu textArea={true} action={(emoji) => {action(inputValue + " " + emoji.emoji)}} close={() => {toggleEmojiOpen(false)}} /> : null}
        </motion.div>
        
        </>
    )
}
