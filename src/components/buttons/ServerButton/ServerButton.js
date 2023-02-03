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

    const [width, setWidth] = React.useState('60%');

    const [opacity, setOpacity] = React.useState(0.7);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const darkMode = useSelector(selectDarkModeEnabledState);

    const secondaryColor = useSelector(selectSecondaryColor);
    
    const handleAnimation = (down, state) => {

        if (state) {
            setWidth('100%')
        } else {
            setWidth('60%')
        }

        if (down) {
            setOpacity(0.9);
        } else {
            setOpacity(0.7);
        }
        
    }

    const handleAction = (e) => {

        action(server_id, server_name, e.pageY)

    }

    return (
        <motion.div
        id={`server-button-${server_id}`}
        animate={animation}
        style={{
            width: "calc(100%)",
            height: "calc(120px)",
            backgroundColor: primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            cursor: 'pointer',
            padding: "0",
            position: 'relative',
            overflow: 'hidden'
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
                width: '100%',
                height: "100%",
                overflow: 'hidden',
                flexShrink: 0,
                position: 'absolute'
            }}>
                <Image cursor='pointer' image={server_banner} />
            </div>
            <div
            style={{
                position: 'absolute',
                zIndex: 1,
                right: 0,
                fontSize: '0.7rem',
                background: 'rgba' + (secondaryColor.split('rgb')[1].split(')') + ` ${opacity})`),
                width: width,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(2px)',
                transition: '0.2s'
            }}
            >
                <h1
                style={{
                    color: textColor,
                    fontSize: '1.1rem',
                    marginLeft: '0.2rem'
                }}
                >
                    {server_name}
                </h1>
            </div> 
        </motion.div>
    )
}
