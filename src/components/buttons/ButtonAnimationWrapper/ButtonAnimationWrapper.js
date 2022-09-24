
// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

// state
import {selectAccentColor, selectDarkModeEnabledState, selectPrimaryColor, selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ButtonAnimationWrapper = ({action = () => {}, position = '', zIndex = 0, top = 0, left = 0, className, width = 50, height = 50, borderRadius = '15px', justifyContent = 'center', invert = false, pointerOptions = null, children, active = false, opacity = 1, id = "", margin, right}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const darkMode = useSelector(selectDarkModeEnabledState);

    const handleAnimation = (color, e) => {
        if (e) e.stopPropagation();
        if (active) return;
        animation.start({
            backgroundColor: color
        })
        
    }

    const handleAction = (e) => {
        action(e)
    }

    React.useEffect(() => {
        animation.start({
            backgroundColor: active && opacity === 1 ? accentColor : darkMode ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)",
            opacity: active ? opacity : 1
        })
    // eslint-disable-next-line
    }, [active])

    return (
        <motion.div
        id={id}
        onClick={handleAction}
        className={className}
        style={{
            borderRadius: borderRadius,
            width: width,
            height: height,
            flexShrink: 0,
            cursor: active ? 'default' : 'pointer',
            display: 'flex',
            justifyContent: justifyContent,
            alignItems: 'center',
            padding: 10,
            pointerEvents: pointerOptions,
            position: position,
            top: top,
            left: left,
            zIndex: zIndex,
            margin: margin,
            right: right
        }}
        animate={animation}
        onMouseEnter={(e) => {handleAnimation(!invert ? primaryColor : secondaryColor, e)}}
        onMouseLeave={(e) => {handleAnimation(darkMode ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)", e)}}
        onMouseDown={(e) => {handleAnimation(!invert ? accentColor : accentColor, e)}}
        onMouseUp={(e) => {handleAnimation(!invert ? primaryColor : secondaryColor, e)}}
        transition={{duration: 0.1}}
        >
            {children}
        </motion.div>
    )
}
