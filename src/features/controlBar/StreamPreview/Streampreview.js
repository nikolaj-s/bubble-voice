import React from 'react';

import { motion } from 'framer-motion';

import "./StreamPreview.css";
import { useSelector } from 'react-redux';
import { selectCurrentScreenName } from '../ControlBarSlice';
import { selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const Streampreview = () => {

    const streamName = useSelector(selectCurrentScreenName);

    const textColor = useSelector(selectTextColor);

    return (
        <motion.div
        initial={{height: 0, opacity: 0}}
        animate={{height: 150, opacity: 1}}
        exit={{opacity: 0, height: 0}}
        className='stream-preview-wrapper'
        key={'user-streaming-preview-container'}
        >   
            <p style={{color: textColor}}>Streaming: {streamName}</p>
            <div id="user-stream-source-wrapper" className='inner-user-streaming-preview-container'>

            </div>
        </motion.div>
    )
}
