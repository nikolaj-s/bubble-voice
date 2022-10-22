
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
            filter: `contrast(${color})`
        })
        
    }

    const handleAction = (e) => {
        action(e)
    }

    React.useEffect(() => {
        animation.start({
            opacity: active ? opacity : 1,
            filter: invert ? 'contrast(100%)' : active ? `contrast(${50}%)` : `contrast(${100}%)`
        })
    // eslint-disable-next-line
    }, [active])

    return (
        <motion.div
        id={id}
        onClick={handleAction}
        className={className}
        style={{
            backgroundColor: invert ? secondaryColor : active ? primaryColor : secondaryColor,
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
            right: right,
        }}
        animate={animation}
        onMouseEnter={(e) => {handleAnimation('50%', e)}}
        onMouseLeave={(e) => {handleAnimation('100%', e)}}
        onMouseDown={(e) => {handleAnimation('80%', e)}}
        onMouseUp={(e) => {handleAnimation('50%', e)}}
        transition={{duration: 0.1}}
        >
            {children}
        </motion.div>
    )
}
