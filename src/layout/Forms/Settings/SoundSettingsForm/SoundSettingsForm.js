import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import VolumeSlider from '../../../../components/ui/Inputs/VolumeSlider/VolumeSlider'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifcationVolume, setVideoVolume } from '../../../../features/Settings/Sound/soundSlice'

export const SoundSettingsForm = () => {

    const dispatch = useDispatch();
    
    const {notificationVolume, videoVolume} = useSelector(state => state.soundSlice);

    return (
        <>
        <Header text='Sound Settings' />
        <Label label='Notification Sound Volume' />
        <VolumeSlider onChange={(value) => {dispatch(setNotifcationVolume(value))}} value={notificationVolume} label={notificationVolume * 100} />
        <Label label='Video Sound Volume' />
        <VolumeSlider onChange={(value) => {dispatch(setVideoVolume(value))}} value={videoVolume} label={videoVolume * 100} />
        </>
    )
}
