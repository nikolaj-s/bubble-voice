// library's
import React from 'react'
import { motion } from 'framer-motion';

// components
import { Song } from '../../../../../../components/widgets/Widgets/MusicWIdget/Song/Song'

// style
import "./NowPlayingOverlay.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const NowPlayingOverlay = ({ data, onEnd = () => {} }) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {

        setTimeout(() => {

            onEnd();

        }, 3000)

    }, [])

    return (
        <motion.div 
        key={"now-playing-overlay"}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        style={{
            backgroundColor: `rgba${primaryColor.split('rgb')[1].split(')')[0]}, 0.5)`
        }}
        className="now-playing-overlay-container">
            <h1
            style={{
                color: textColor
            }}
            >Now Playing:</h1>
            <Song image={data?.image} name={data?.name} />
        </motion.div>
    )
}
