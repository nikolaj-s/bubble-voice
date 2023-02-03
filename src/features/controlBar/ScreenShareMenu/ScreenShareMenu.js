// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScreenButton } from '../../../components/buttons/ScreenButton/ScreenButton'
import { AnimatePresence, motion } from 'framer-motion'

// state
import { selectAccentColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectScreens, setCurrentScreen } from '../ControlBarSlice';

// style's
import "./ScreenShareMenu.css";

export const ScreenShareMenu = ({selectingScreens}) => {

    const dispatch = useDispatch();

    const screens = useSelector(selectScreens);

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const selectScreen = (id) => {
        
        dispatch(setCurrentScreen(id));
    }

    return (
        <>
        <AnimatePresence>
            {selectingScreens ?
            <motion.div
            initial={{
                left: '-600px'
            }}
            animate={{
                left: '0px'
            }}
            exit={{
                left: '-600px'
            }}
            style={{
                backgroundColor: secondaryColor,
                border: `solid 3px ${primaryColor}`
            }}
            key={"share-screen-menu"}
            className='screen-share-menu'>
                <h3 style={{
                    color: textColor
                }}>Select Screen To Share</h3>
                {screens.map(screen => {
                    return <ScreenButton action={selectScreen} id={screen.id} name={screen.name} key={screen.id} thumbnail={screen.thumbnail} />
                })}
                
            </motion.div>
            : null}
        </AnimatePresence> 
        </>
    )
}
