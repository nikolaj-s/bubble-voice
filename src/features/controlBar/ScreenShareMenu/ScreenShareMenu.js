// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScreenButton } from '../../../components/buttons/ScreenButton/ScreenButton'
import { motion } from 'framer-motion'

// state
import { closeScreenShareMenu, selectScreens, setCurrentScreen, } from '../ControlBarSlice';
import {CloseIcon} from '../../../components/Icons/CloseIcon/CloseIcon'

// style's
import "./ScreenShareMenu.css";
import { playSoundEffect } from '../../settings/soundEffects/soundEffectsSlice';
import { handleSaveVoiceVideoSettings, selectExperimentalAudioCapture, toggleSelectedVoiceVideoState } from '../../settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { RadioButton } from '../../../components/buttons/RadioButton/RadioButton';

export const ScreenShareMenu = () => {

    const dispatch = useDispatch();

    const screens = useSelector(selectScreens);

    const enableAudio = useSelector(selectExperimentalAudioCapture);

    const selectScreen = (id, name) => {
        
        dispatch(playSoundEffect({default: 'newMessage'}))

        dispatch(setCurrentScreen({id: id, name: name}));
    }

    const closeScreenShare = () => {
        dispatch(closeScreenShareMenu())
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
        onClick={(e) => {e.stopPropagation()}}
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
        <RadioButton margin={'0px 0px 5px 5px'} width='calc(100% - 20px)' invert={true} action={handleAudioToggle} name={"Capture Audio"} state={enableAudio} />
        </>
    )
}
