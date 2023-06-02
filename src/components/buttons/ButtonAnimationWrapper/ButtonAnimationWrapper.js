
// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ButtonAnimationWrapper = ({desc_width = '100%', onMouseDown = () => {},display = 'flex', action = () => {}, position = 'relative', zIndex = 0, top = 0, left = 0, className, width = 50, height = 50, borderRadius = '5px', justifyContent = 'center', invert = false, pointerOptions = null, children, active = false, opacity = 1, id = "", margin, right, description, flip_description = false, padding = 10, altInvert = false, right_orientation_desc = false, o_mouseEnter = () => {}, o_mouseLeave = () => {}, desc_o_mouse_leave = () => {}, desc_space = 25, transparent, desc_font_size = '0.7rem'}) => {

    const animation = useAnimation();

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const [desc, toggleDesc] = React.useState(false);

    const [cord, setCord] = React.useState({});

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

    const handleOnMouseEnter = (e) => {

        if (!description) return;

        o_mouseEnter();

        let el;

        if (e.target.nodeName !== 'div') {
            el = e.target;
        } else {
            el = e.target.parentElement;
        }
        

        setCord({x: e.pageX, y: e.pageY});
        
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
            animate={null}
            style={{
                width: desc_width,
                top: right_orientation_desc ? '2px' : null,
                right: right_orientation_desc ? '-45px' : null,
                left: right_orientation_desc ? null : '50%',
                bottom: right_orientation_desc ? null : flip_description ? '-120%' : height + desc_space,
                minWidth: right_orientation_desc ? null : desc_width,
                position: right_orientation_desc ? 'absolute' : 'absolute',
                width: right_orientation_desc ? 150 : null,
                zIndex: 999,
                fontWeight: '100',
                fontSize: '0.8rem',
                backgroundColor: accentColor,
                padding: 5,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                opacity: 1,
                transform: 'translateX(-50%)',
                filter: 'none'
                }}>
            <p style={{color: textColor, padding: '0px', margin: 0, textAlign: 'center', fontSize: desc_font_size}}>{description}</p>
            </motion.div>: null}
        <motion.div
        id={id}
        onClick={handleAction}
        className={className}
        style={{
            backgroundColor: (active && altInvert) ? null : transparent ? null : invert ? secondaryColor : (active || altInvert) ? primaryColor : secondaryColor,
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
        onMouseEnter={(e) => {handleAnimation('50%', e); handleOnMouseEnter(e)}}
        onMouseLeave={(e) => {handleAnimation('100%', e); handleOnMouseLeave(e)}}
        onMouseDown={(e) => {handleAnimation('80%', e); onMouseDown()}}
        onMouseUp={(e) => {handleAnimation('50%', e)}}
        transition={{duration: 0.1}}
        >
           
            {children}
        </motion.div>
    </div>
    </>
    )
}
