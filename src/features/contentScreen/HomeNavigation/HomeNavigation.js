// library's
import React from 'react'
import { motion, useAnimation } from 'framer-motion';

// style
import "./HomeNavigation.css"
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const HomeNavigation = ({navigate, page}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const HomeBtnAnimation = useAnimation();

    const ReleaseBtnAnimation = useAnimation();

    React.useEffect(() => {

        if (page === 'home') {
            HomeBtnAnimation.start({
                backgroundColor: secondaryColor,
                cursor: 'default'
            })
            ReleaseBtnAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'pointer'
            })
        } else if (page === 'release') {
            HomeBtnAnimation.start({
                backgroundColor: primaryColor,
                cursor: 'pointer'
            })
            ReleaseBtnAnimation.start({
                backgroundColor: secondaryColor,
                cursor: 'default'
            })
        }
        
    // eslint-disable-next-line
    }, [page])

    const handleAnimation = (color, state, animator) => {

        if (state === page) return;

        animator.start({
            backgroundColor: color
        })

    }

    const handleNavigation = (state, animator) => {

        if (state === page) return;

        animator.start({
            backgroundColor: accentColor
        })

        navigate(state);

    }

    return (
        <div 
        style={{backgroundColor: primaryColor, borderBottom: `solid 1px ${primaryColor}`}}
        className='home-navigation-container'>
            <motion.div
            animate={HomeBtnAnimation}
            transition={{duration: 0.2}}
            onMouseOver={() => {handleAnimation(secondaryColor, 'home', HomeBtnAnimation)}}
            onMouseLeave={() => {handleAnimation(primaryColor, 'home', HomeBtnAnimation)}}
            onClick={() => {handleNavigation('home', HomeBtnAnimation)}}
            className='home-navigation-button'>
                <h3
                style={{
                    color: textColor,
                }}
                >Home</h3>
            </motion.div>

            <motion.div 
            animate={ReleaseBtnAnimation}
            transition={{duration: 0.2}}
            onMouseOver={() => {handleAnimation(secondaryColor, 'release', ReleaseBtnAnimation)}}
            onMouseLeave={() => {handleAnimation(primaryColor, 'release', ReleaseBtnAnimation)}}
            onClick={() => {handleNavigation('release', ReleaseBtnAnimation)}}
            className='home-navigation-button'>
                <h3
                style={{
                    color: textColor
                }}
                >Release Notes</h3>
            </motion.div>
            <div style={{backgroundColor: secondaryColor}} className='home-navigation-filler'></div>
        </div>
    )
}
