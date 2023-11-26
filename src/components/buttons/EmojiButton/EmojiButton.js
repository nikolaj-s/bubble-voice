import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import {motion, AnimatePresence } from 'framer-motion'

export const EmojiButton = (props) => {

    const color = useSelector(selectTextColor);

    let [index, setIndex] = React.useState(0);

    const emojis = ['😆', '😃', '🫠', '😉', '🤪', '😋', '😍']

    const handleIndexChange = () => {
        if (index === emojis.length - 1) {
            setIndex(0);
        } else {
            setIndex(index++);
        }
    }

    return (
        <ButtonAnimationWrapper onMouseDown={handleIndexChange} o_mouseEnter={handleIndexChange} {...props} >
            <AnimatePresence mode='wait'>
               <motion.p 
               initial={{scale: 0.5}}
               animate={{scale: 1}}
               exit={{scale: 0.5}}
               key={index}
                style={{
                    fontSize: props.fontSize ? props.fontSize : 22,
                    lineHeight: 0,
                    pointerEvents: 'none'
                }}
                >
                    {emojis[index]}
                </motion.p>
            </AnimatePresence>
        </ButtonAnimationWrapper>
    )
}
