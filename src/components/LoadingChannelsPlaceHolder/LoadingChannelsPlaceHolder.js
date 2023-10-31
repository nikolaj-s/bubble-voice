import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import {motion} from 'framer-motion';

export const LoadingChannelsPlaceHolder = () => {
    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return (
                <div
                key={i}
                    style={{
                        width: 'calc(100% - 10px)',
                        height: '34px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        position: 'relative',
                        marginBottom: 5,
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
            )
        })}
        
        
        </>
  )
}
