import React from 'react';

import { motion } from 'framer-motion';

import "./StreamPreview.css";
import { useSelector } from 'react-redux';
import { selectCurrentScreenName } from '../ControlBarSlice';
import { selectGlassColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAppFocusedState } from '../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const Streampreview = () => {

    const streamName = useSelector(selectCurrentScreenName);

    const textColor = useSelector(selectTextColor);

    const focused = useSelector(selectAppFocusedState);

    const glassColor = useSelector(selectGlassColor);

    React.useEffect(() => {

        let video = document.querySelectorAll('#user-stream-source-wrapper video')[0];
        
        if (video) {
            if (focused) {
                video?.play();
            } else {
                video?.pause();
            }
        }

    }, [focused])

    return (
        <motion.div
        initial={{height: 0, opacity: 0}}
        animate={{height: 152, opacity: 1}}
        exit={{opacity: 0, height: 0}}
        className='stream-preview-wrapper'
        key={'user-streaming-preview-container'}
        >   
            <p style={{color: textColor}}>Streaming: {streamName}</p>
            <div id="user-stream-source-wrapper" className='inner-user-streaming-preview-container'>

                {!focused ? 
                <div 
                style={{backgroundColor: glassColor}}
                className='preview-paused-message'>
                    <h2 style={{color: textColor}}>Preview paused to save performance</h2>
                </div>
                : null    
                }

            </div>
        </motion.div>
    )
}
