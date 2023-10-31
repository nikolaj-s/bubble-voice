// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScreenButton } from '../../../components/buttons/ScreenButton/ScreenButton'
import { AnimatePresence, motion } from 'framer-motion'

// state
import {  selectPrimaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectScreens, setCurrentScreen, toggleControlState } from '../ControlBarSlice';
import { BoolButton } from '../../../components/buttons/BoolButton/BoolButton'
import {CloseIcon} from '../../../components/Icons/CloseIcon/CloseIcon'

// style's
import "./ScreenShareMenu.css";
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { handleSaveVoiceVideoSettings, selectExperimentalAudioCapture, toggleSelectedVoiceVideoState } from '../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';

export const ScreenShareMenu = ({selectingScreens}) => {

    const dispatch = useDispatch();

    const screens = useSelector(selectScreens);

    const primaryColor = useSelector(selectPrimaryColor);

    const enableAudio = useSelector(selectExperimentalAudioCapture);

    const selectScreen = (id, name) => {
        
        dispatch(playSoundEffect({default: 'newMessage'}))

        dispatch(setCurrentScreen({id: id, name: name}));
    }

    const closeScreenShare = () => {
        dispatch(toggleControlState('screenShareState'))
    }

    React.useEffect(() => {

        document.body.addEventListener('click', closeScreenShare);

        return () => {

            document.body.removeEventListener('click', closeScreenShare);

            for (const screen of screens) {
                URL.revokeObjectURL(screen.thumbnail);
                URL.revokeObjectURL(screen.icon);
            }
        }

    }, [screens])

    const handleAudioToggle = () => {
        dispatch(toggleSelectedVoiceVideoState('experimentalAudioCapture'));

        dispatch(handleSaveVoiceVideoSettings());
    }
    
    return (
        <>
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
        <BoolButton action={handleAudioToggle} name={"Capture Audio"} state={enableAudio} />
        </>
    )
}
