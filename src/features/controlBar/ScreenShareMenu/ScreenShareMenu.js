// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScreenButton } from '../../../components/buttons/ScreenButton/ScreenButton'
import { motion } from 'framer-motion'

// state
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectScreens, setCurrentScreen } from '../ControlBarSlice';

// style's
import "./ScreenShareMenu.css";

export const ScreenShareMenu = () => {

    const dispatch = useDispatch();

    const screens = useSelector(selectScreens);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const selectScreen = (id) => {
        dispatch(setCurrentScreen(id));
    }

    return (
        <motion.div
        initial={{
            scale: 0
        }}
        animate={{
            scale: 1
        }}
        exit={{
            scale: 0
        }}
        style={{
            backgroundColor: secondaryColor,
            border: `solid 4px ${accentColor}`
        }}
        className='screen-share-menu'>
            <h3 style={{
                color: textColor
            }}>Select Screen To Share</h3>
            {screens.map(screen => {
                return <ScreenButton action={selectScreen} id={screen.id} name={screen.name} key={screen.id} thumbnail={screen.thumbnail} />
            })}
        </motion.div>
    )
}
