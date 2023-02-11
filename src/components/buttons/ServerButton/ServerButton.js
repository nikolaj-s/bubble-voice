// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion'

// component's
import { Image } from '../../Image/Image'
import { useSelector } from 'react-redux'

// state
import { selectAccentColor, selectDarkModeEnabledState, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ServerButton = ({_id, action, server_banner, server_name, server_id}) => {

    const animation = useAnimation();

    const [hover, toggleHover] = React.useState(false);

    const [down, toggleDown] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const darkMode = useSelector(selectDarkModeEnabledState);

    const secondaryColor = useSelector(selectSecondaryColor);
    
    const handleAnimation = (down, state) => {

        toggleHover(state);

        toggleDown(down);
        
    }

    const handleAction = (e) => {

        action(server_id, server_name, e.pageY)

    }

    return (
        <motion.div
        id={`server-button-${server_id}`}
        animate={animation}
        style={{
            width: "calc(98% - 20px)",

            height: "calc(80px)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: "0 5px",
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 5,
            transition: '0.1s',
            backgroundColor: down ? accentColor : hover ? primaryColor : secondaryColor
        }}
        onMouseEnter={() => {handleAnimation(false, true)}}
        onMouseLeave={() => {handleAnimation(false, false)}}
        onMouseDown={() => {handleAnimation(true, true)}}
        onMouseUp={() => {handleAnimation(false)}}
        transition={{duration: 0.1}}
        onClick={handleAction}
        >
            <div 
            style={{
                width: '70px',
                height: "70px",
                overflow: 'hidden',
                flexShrink: 0,
                borderRadius: '50%'
            }}>
                <Image cursor='pointer' image={server_banner} />
            </div>
            <div
            style={{
                zIndex: 1,
                right: 0,
                fontSize: '0.6rem',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transition: '0.2s',
                marginLeft: 5
            }}
            >
                <h1
                style={{
                    color: textColor,
                    fontSize: '0.8rem',
                    marginLeft: '0.2rem',
                    fontWeight: 400
                }}
                >
                    {server_name}
                </h1>
            </div> 
        </motion.div>
    )
}
