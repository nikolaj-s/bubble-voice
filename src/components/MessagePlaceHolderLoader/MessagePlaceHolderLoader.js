import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import {motion} from 'framer-motion';

export const MessagePlaceHolderLoader = () => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <>
        <div
        style={{
            width: 'calc(100% - 10px)',
            height: '500px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 5,
            flexShrink: 0,
            marginLeft: 5
        }}
        >
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>  
        </div>
        <div
        style={{
            width: 'calc(100% - 10px)',
            height: '150px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 5,
            flexShrink: 0,
            marginLeft: 5
            
        }}>
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>  
        </div>
        <div
        style={{
            width: 'calc(100% - 10px)',
            height: '300px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 5,
            flexShrink: 0,
            marginLeft: 5
        }}>
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>  
        </div>
        <div
        style={{
            width: 'calc(100% - 10px)',
            height: '150px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 5,
            flexShrink: 0,
            marginLeft: 5
        }}>
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>  
        </div>
        <div
        style={{
            width: 'calc(100% - 10px)',
            height: '600px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 5,
            flexShrink: 0,
            marginLeft: 5
        }}>
            <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div>  
        </div>
        </>
  )
}
