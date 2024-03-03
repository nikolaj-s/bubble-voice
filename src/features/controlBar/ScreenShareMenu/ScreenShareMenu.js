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
import { selectGlassColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { TextButton } from '../../../components/buttons/textButton/TextButton';
import { AltError } from '../../../components/AltError/AltError'

export const ScreenShareMenu = () => {

    const dispatch = useDispatch();

    const screens = useSelector(selectScreens);

    const enableAudio = useSelector(selectExperimentalAudioCapture);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

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
        <div 
        style={{backgroundColor: glassColor}}
        className='screen-picker-outer-wrapper'>
        <motion.div
        style={{backgroundColor: secondaryColor}}
        onClick={(e) => {e.stopPropagation()}}
        key={"screen-share-menu"}
        className='screen-share-menu'>
            <h3 className='screen-share-title' style={{color: textColor}}>Pick a Screen To Share:</h3>
            <div style={{backgroundColor: textColor, width: '100%', height: 2, opacity: 0.4, flexShrink: 0}} />
            <div className='inner-screen-button-wrapper'>
            {screens.map(screen => {
                    return <ScreenButton action={selectScreen} id={screen.id} name={screen.name} key={screen.id} thumbnail={screen.thumbnail} icon={screen.icon} />
                })}
            </div> 
            {enableAudio ?
            <div className='audio-disclaimer-message'>
                <AltError error={enableAudio} errorMessage={"With audio enabled users in your channel will be capped to 100% volume to prevent clipping"} />
            </div>
            : null}
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', height: 45, flexShrink: 0}}>
            <RadioButton margin={'0px 5px 0px 0px'} width='calc(100% - 10px)' action={handleAudioToggle} name={"Capture Audio"} state={enableAudio} />
            <TextButton name={'Cancel'} action={closeScreenShare} width={150} />
            </div>
            
        </motion.div>
       
        </div>
    )
}
