// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion'

// component's
import { Image } from '../../Image/Image'
import { useSelector } from 'react-redux'

// state
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./ServerButton.css";
import { selectServerId } from '../../../features/server/ServerSlice'

export const ServerButton = ({_id, action, server_banner, server_name, server_id}) => {

    const animation = useAnimation();

    const [hover, toggleHover] = React.useState(false);

    const [down, toggleDown] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const currentServer = useSelector(selectServerId);

    const textColor = useSelector(selectTextColor);

    const handleAnimation = (down, state) => {

        toggleHover(state);

        toggleDown(down);
        
    }

    const handleAction = (e) => {

        action(server_id, server_name, e.pageY)

    }

    return (
        <motion.div
        className='server-button-container'
        id={`server-button-${server_id}`}
        
        animate={animation}
        onMouseEnter={() => {handleAnimation(false, true)}}
        onMouseLeave={() => {handleAnimation(false, false)}}
        onMouseDown={() => {handleAnimation(true, true)}}
        onMouseUp={() => {handleAnimation(false)}}
        transition={{duration: 0.1}}
        onClick={handleAction}
        >
            <div 
            style={{
                width: server_id === currentServer || down ? '41px' : 45,
                borderRadius: hover || server_id === currentServer ? '10px' : '50%' ,
                height: server_id === currentServer || down ? 41 : 45,
                border: server_id === currentServer || down ? `solid 2px ${textColor}` : null,
                cursor: server_id === currentServer ? 'default' : 'pointer'
            }}
            className='server-button-image-container'
            >
                <Image cursor={server_id === currentServer ? 'default' : 'pointer'} image={server_banner} />
            </div>
            {hover ? 
            <div style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>{server_name}</h2>
            </div>
            : null}
        </motion.div>
    )
}
