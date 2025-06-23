import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import VolumeSlider from '../../../../components/ui/Inputs/VolumeSlider/VolumeSlider'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifcationVolume, setVideoVolume } from '../../../../features/Settings/Sound/soundSlice'
import { setSoundEffectVolume } from '../../../../features/SoundEffects/soundEffectsSlice'

export const SoundSettingsForm = () => {

    const dispatch = useDispatch();
    
    const {videoVolume} = useSelector(state => state.soundSlice);

    const soundEffectsVolume = useSelector(state => state.soundEffectsSlice.volume);

    return (
        <>
        <Header text='Sound Settings' />
        <Label label='Notification Sound Volume' />
        <VolumeSlider onChange={(value) => {dispatch(setSoundEffectVolume(value))}} value={soundEffectsVolume} min={0} max={1} step={0.01} label={soundEffectsVolume * 100} />
        <Label label='Video Sound Volume' />
        <VolumeSlider onChange={(value) => {dispatch(setVideoVolume(value))}} value={videoVolume} label={videoVolume * 100} />
        </>
    )
}
