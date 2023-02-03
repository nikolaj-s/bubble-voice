// librarys
import React from 'react'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectCurrentChannel } from '../../../ServerSlice';

// components
import { SettingsSpacer } from '../../../../../components/Spacers/SettingsSpacer/SettingsSpacer'
import { WidgetPreview } from '../../../../../components/widgets/WidgetPreview/WidgetPreview';

// style
import "./Widgets.css";


export const Widgets = () => {

    const channel = useSelector(selectCurrentChannel);

    return (
        <motion.div 
        key={"room-content-container"}
        className='content-outer-container'
        
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
        transition={{
            duration: 0.2
        }}
        >
            <div className='widget-preview-wrapper'>
                <WidgetPreview widgets={channel.widgets} />
            </div>
        </motion.div>
    )
}
