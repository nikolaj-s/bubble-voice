import { useAnimation, motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const CharacterCount = ({count = 0}) => {

    const textColor = useSelector(selectTextColor);

    const animation = useAnimation();

    React.useEffect(() => {

        if (count > 1024) {
            animation.start({
                color: 'rgb(255, 0, 0)',
                fontSize: '0.9rem'
            })
        } else {
            animation.start({
                color: textColor,
                fontSize: null
            })
        }
        
    // eslint-disable-next-line
    }, [count])

    return (
        <div className='input-character-count'>
            <motion.p
            animate={animation}
            style={{color: textColor}}
            >{count} / 1024</motion.p>
        </div>
    )
}
