// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion'

// component's
import { Image } from '../../Image/Image'
import { HeaderTitle } from '../../titles/headerTitle/headerTitle'
import { useSelector } from 'react-redux'

// state
import { selectAccentColor, selectDarkModeEnabledState, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ServerButton = ({_id, action, server_banner, server_name, server_id}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const darkMode = useSelector(selectDarkModeEnabledState);
    
    const handleAnimation = (color) => {

        animation.start({
            border: `4px solid ${color}`
        })
        
    }

    const handleAction = () => {
        action(server_id, server_name)
    }

    return (
        <motion.div
        id={`server-button-${server_id}`}
        animate={animation}
        style={{
            width: "calc(100% - 28px - 8px)",
            height: "calc(130px - 8px)",
            backgroundColor: primaryColor,
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            margin: "2% 0 0 0",
            justifyContent: 'space-around',
            cursor: 'pointer',
            padding: "0 14px",
            border: `solid 4px ${darkMode ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)'}`
        }}
        onMouseEnter={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation(darkMode ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)')}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        transition={{duration: 0.1}}
        onClick={handleAction}
        >
            <div 
            style={{
                width: 100,
                height: 100,
                borderRadius: '15px',
                overflow: 'hidden',
                flexShrink: 0,
                marginRight: 10
            }}>
                <Image image={server_banner} />
            </div>
            <HeaderTitle textAlign='center' title={server_name} />
        </motion.div>
    )
}
