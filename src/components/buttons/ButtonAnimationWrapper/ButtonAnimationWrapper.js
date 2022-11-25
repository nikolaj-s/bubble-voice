
// library's
import { useAnimation, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ButtonAnimationWrapper = ({action = () => {}, position = 'relative', zIndex = 0, top = 0, left = 0, className, width = 50, height = 50, borderRadius = '10px', justifyContent = 'center', invert = false, pointerOptions = null, children, active = false, opacity = 1, id = "", margin, right, description, flip_description = false, padding = 10, altInvert = false}) => {

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
        toggleDesc(false);
    }

    return (
    <>
    <div 
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
            animate={null}
            style={{
                left: '50%',
                bottom: flip_description ? '-100%' : height + 25,
                minWidth: '100%',
                position: 'absolute',
                zIndex: 999,
                fontWeight: '100',
                fontSize: '1rem',
                backgroundColor: accentColor,
                padding: 5,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                opacity: 1,
                transform: 'translateX(-50%)',
                filter: 'none'
                }}>
            <p style={{color: textColor, padding: 0, margin: 0, textAlign: 'center', fontSize: '0.8rem'}}>{description}</p>
            </motion.div>: null}
        <motion.div
        id={id}
        onClick={handleAction}
        className={className}
        style={{
            backgroundColor: invert ? secondaryColor : (active || altInvert) ? primaryColor : secondaryColor,
            borderRadius: borderRadius,
            width: width,
            height: height,
            flexShrink: 0,
            padding: padding,
            cursor: active ? 'default' : 'pointer',
            display: 'flex',
            justifyContent: justifyContent,
            alignItems: 'center',
            pointerEvents: pointerOptions,
            position: position,
            zIndex: zIndex,
        }}
        animate={animation}
        onMouseEnter={(e) => {handleAnimation('50%', e); handleOnMouseEnter(e)}}
        onMouseLeave={(e) => {handleAnimation('100%', e); handleOnMouseLeave(e)}}
        onMouseDown={(e) => {handleAnimation('80%', e)}}
        onMouseUp={(e) => {handleAnimation('50%', e)}}
        transition={{duration: 0.1}}
        >
           
            {children}
        </motion.div>
    </div>
    </>
    )
}
