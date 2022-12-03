// library's
import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { motion } from 'framer-motion'

// style's
import "./TwitterEmbed.css";
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const TwitterEmbed = ({id}) => {

    const [loading, toggleLoading] = React.useState(true);

    const handleOnLoad = () => {
        toggleLoading(false);
    }

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <>
        {id ?
        <div className='twitter-embed-container'>
            <TwitterTweetEmbed onLoad={handleOnLoad} tweetId={id} />
            {loading ?
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>         
            : null}
        </div>
        : null}
        </>
    )
}
