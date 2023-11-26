
// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor, selectTransparentPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ButtonAnimationWrapper = ({align_desc_right, active_background, desc_width = '100%', background, onMouseDown = () => {},display = 'flex', action = () => {}, position = 'relative', zIndex = 0, top = 0, left = 0, className, width = 50, height = 50, borderRadius = '5px', justifyContent = 'center', invert = false, pointerOptions = null, children, active = false, opacity = 1, id = "", margin, right, description, flip_description = false, padding = 10, altInvert = false, right_orientation_desc = false, o_mouseEnter = () => {}, o_mouseLeave = () => {}, desc_o_mouse_leave = () => {}, desc_space = 25, transparent, desc_font_size = '0.7rem'}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const transparentColor = useSelector(selectTransparentPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const [desc, toggleDesc] = React.useState(false);

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
                opacity: active ? opacity : 1,
                backgroundColor: active ? (active_background || transparentColor) : (background || transparentColor)
            })
        
    // eslint-disable-next-line
    }, [active, background])

    const handleOnMouseEnter = (e) => {

        o_mouseEnter();

        if (!description) return;

        toggleDesc(true);
    }

    const handleOnMouseLeave = (e) => {

        o_mouseLeave();

        toggleDesc(false);
    }

    return (
    <>
    <div 
    className='b-container-wrapper'
    style={{
        
        borderRadius: borderRadius,
        flexShrink: 0,
        cursor: active ? 'default' : 'pointer',
        justifyContent: justifyContent,
        alignItems: 'center',
        pointerEvents: pointerOptions,
        position: position,
        top: top,
        left: left,
        zIndex: zIndex,
        margin: margin,
        right: right,
        objectFit: 'cover',
    }}>
    {desc ? 
            <motion.div 
            onMouseLeave={desc_o_mouse_leave}
            style={{
                width: desc_width,
                minWidth: '100%',
                top: right_orientation_desc ? '1px' : null,
                right: align_desc_right ? -40 : right_orientation_desc ? '-15px' : null,
                left: align_desc_right ? null : right_orientation_desc ? null : '50%',
                bottom: right_orientation_desc ? null : flip_description ? '-120%' : height + desc_space,
                minWidth: right_orientation_desc ? null : desc_width,
                position: 'absolute',
                zIndex: 999,
                fontWeight: '100',
                fontSize: '0.8rem',
                flexShrink: 0,
                backgroundColor: primaryColor,
                padding: 5,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                opacity: 1,
                transform: 'translateX(-50%)',
                filter: 'none',
                boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.4)',
                animation: 'pop-in forwards linear 0.1s',
                }}>
            <p style={{color: textColor, padding: '0px', margin: 0, textAlign: 'center', fontSize: desc_font_size}}>{description}</p>
            </motion.div>: null}
        <motion.div
        id={id}
        onClick={handleAction}
        className={className}
        style={{
            backgroundColor: background || transparentColor,
            borderRadius: borderRadius,
            width: width,
            height: height,
            flexShrink: 0,
            padding: padding,
            cursor: active ? 'default' : 'pointer',
            display: display,
            justifyContent: justifyContent,
            alignItems: 'center',
            pointerEvents: pointerOptions,
            position: position,
            zIndex: zIndex,
        }}
        animate={animation}
        onMouseEnter={(e) => {handleAnimation(invert ? primaryColor : secondaryColor, e); handleOnMouseEnter(e)}}
        onMouseLeave={(e) => {handleAnimation(background || transparentColor, e); handleOnMouseLeave(e)}}
        onMouseDown={(e) => {handleAnimation(invert ? secondaryColor : accentColor, e); onMouseDown()}}
        onMouseUp={(e) => {handleAnimation(invert ? primaryColor: secondaryColor, e)}}
        transition={{duration: 0.1}}
        >
           
            {children}
        </motion.div>
    </div>
    </>
    )
}
