// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScreenButton } from '../../../components/buttons/ScreenButton/ScreenButton'
import { AnimatePresence, motion } from 'framer-motion'

// state
import { selectAccentColor, selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectScreens, setCurrentScreen, toggleControlState } from '../ControlBarSlice';
import {CloseIcon} from '../../../components/Icons/CloseIcon/CloseIcon'
// style's
import "./ScreenShareMenu.css";
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';

export const ScreenShareMenu = ({selectingScreens}) => {

    const dispatch = useDispatch();

    const screens = useSelector(selectScreens);

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const glassColor = useSelector(selectGlassColor);

    const selectScreen = (id) => {
        
        dispatch(playSoundEffect({default: 'newMessage'}))

        dispatch(setCurrentScreen(id));
    }

    const closeScreenShare = () => {
        dispatch(toggleControlState('screenShareState'))
    }
    
    return (
        <>
        <AnimatePresence>
            {selectingScreens ?
            <div style={{backgroundColor: glassColor}} onClick={closeScreenShare} className='outer-screen-select-container'>
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
                    border: `solid 2px ${primaryColor}`
                }}
                key={"share-screen-menu"}
                className='screen-share-menu'>
                    <div  style={{backgroundColor: primaryColor}} className='close-share-menu-container'>
                        <CloseIcon />
                    </div>
                    {screens.map(screen => {
                        return <ScreenButton action={selectScreen} id={screen.id} name={screen.name} key={screen.id} thumbnail={screen.thumbnail} icon={screen.icon} />
                    })}
                    
                </motion.div>
            </div>
                
            : null}
        </AnimatePresence> 
        </>
    )
}
