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

    const primaryColor = useSelector(selectPrimaryColor);

    const selectScreen = (id, name) => {
        
        dispatch(playSoundEffect({default: 'newMessage'}))

        dispatch(setCurrentScreen({id: id, name: name}));
    }

    const closeScreenShare = () => {
        dispatch(toggleControlState('screenShareState'))
    }

    React.useEffect(() => {

        return () => {
            for (const screen of screens) {
                URL.revokeObjectURL(screen.thumbnail);
                URL.revokeObjectURL(screen.icon);
            }
        }

    }, [screens])
    
    return (
        <motion.div
        initial={{
            height: 20,
            width:190,
            bottom: 5,
            opacity: 0
        }}
        animate={{
            height: 345,
            width: 345,
            bottom: 6,
            opacity: 1
        }}
        exit={{
            width: 190,
            height:10,
            maxHeight: 10,
            opacity: 0
        }}
        key={"screen-share-menu"}
        className='screen-share-menu'>
            <div onClick={closeScreenShare} className='close-share-menu-container'>
                <CloseIcon />
            </div>
            <div className='inner-screen-button-wrapper'>
            {screens.map(screen => {
                    return <ScreenButton action={selectScreen} id={screen.id} name={screen.name} key={screen.id} thumbnail={screen.thumbnail} icon={screen.icon} />
                })}
            </div> 
        </motion.div>
    )
}
