// librarys
import React from 'react'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// state
import { selectSecondaryColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectCurrentChannel } from '../../../ServerSlice';

// style
import "./Widgets.css";
import { WidgetPreview } from '../../../../../components/widgets/WidgetPreview/WidgetPreview';

export const Widgets = () => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const channel = useSelector(selectCurrentChannel);

    return (
        <motion.div 
        key={"room-content-container"}
        className='content-outer-container'
        style={{
            backgroundColor: secondaryColor
        }}
        initial={{
            left: "100%",
        }}
        animate={{
            left: "0%"
        }}
        exit={{
            left: "100%"
        }}
        >
            <div className='widget-preview-wrapper'>
                <WidgetPreview widgets={channel.widgets} />
            </div>
        </motion.div>
    )
}
