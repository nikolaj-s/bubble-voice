// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion'

// component's
import { Image } from '../../Image/Image'
import { HeaderTitle } from '../../titles/headerTitle/headerTitle'
import { SubMenuButton } from '../subMenuButton/SubMenuButton'
import { useSelector } from 'react-redux'

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ServerButton = ({_id, action, server_icon, server_name, subAction}) => {
    
    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);
    
    const handleAnimation = (color) => {

        animation.start({
            border: `2px solid ${color}`
        })
        
    }

    const handleAction = () => {
        action(_id, server_name)
    }
    
    return (
        <motion.div
        animate={animation}
        style={{
            width: "calc(100% - 28px - 4px)",
            height: "calc(130px - 4px)",
            backgroundColor: primaryColor,
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            margin: "10px 0 0 0",
            justifyContent: 'space-around',
            cursor: 'pointer',
            padding: "0 14px",
            border: 'solid 2px rgba(255, 255, 255, 0)'
        }}
        onMouseEnter={() => {handleAnimation(accentColor)}}
        onMouseLeave={() => {handleAnimation('rgba(255, 255, 255, 0)')}}
        onMouseDown={() => {handleAnimation(textColor)}}
        onMouseUp={() => {handleAnimation(accentColor)}}
        transition={{duration: 0.1}}
        onClick={handleAction}
        >
            <div 
            style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                marginRight: 10
            }}>
                <Image image={server_icon} />
            </div>
            <HeaderTitle textAlign='start' title={server_name} />
        </motion.div>
    )
}
