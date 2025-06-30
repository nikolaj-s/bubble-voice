import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { setAppearanceSettings, toggleAppearanceSetting } from '../../../../features/Settings/Appearance/appearanceSlice'
import ThemePicker from '../../../../components/ThemePicker/ThemePicker'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { Description } from '../../../../components/ui/Description/Description'
import VolumeSlider from '../../../../components/ui/Inputs/VolumeSlider/VolumeSlider'
import { MessageItem } from '../../../../components/Chat/MessageItem/MessageItem'

export const AppearanceSettingsForm = () => {

    const dispatch = useDispatch();

    const {hideCustomChannelIcons, hideChannelBackgrounds, useBlackVoiceChannelBackground, disableStreamAmbiance, fontSize, maximumMediaHeight} = useSelector(state => state.appearanceSlice);

    return (
        <>
        <Header text='Application' />
        <Label label='Select Theme' />
        <ThemePicker />
        <LineSpacer />
        <Header text='Channels' />
        <Label label='Hide Custom Channel Icons' />
        <ToggleSwitch initialState={hideCustomChannelIcons} onToggle={() => {dispatch(toggleAppearanceSetting('hideCustomChannelIcons'))}} />
        <Label label='Hide Channel Backgrounds' />
        <ToggleSwitch initialState={hideChannelBackgrounds} onToggle={() => {dispatch(toggleAppearanceSetting('hideChannelBackgrounds'))}} />
        <LineSpacer />
        <Header text='Voice Channel' />
        <Label label='Use Black Background' />
        <ToggleSwitch initialState={useBlackVoiceChannelBackground} onToggle={() => {dispatch(toggleAppearanceSetting('useBlackVoiceChannelBackground'))}}/>
        <Label label='Disable Stream Ambiance' />
        <Description description={"Stream Ambiance is the color extension effect that creates a glowing or animated border around active streams. Disabling this feature will turn off the dynamic color effects, resulting in a simpler stream display. This can help improve performance, especially on lower-end devices or when running multiple streams at once."} />
        <ToggleSwitch initialState={disableStreamAmbiance} onToggle={() => {dispatch(toggleAppearanceSetting('disableStreamAmbiance'))}} />
        <LineSpacer />
        <Header text='Text Channel' />
        <Label label='Customize Message Items' />
        <MessageItem notification={true} message={{text: '“The quick brown fox jumps over the lazy dog.”', image: 'https://bubble-media.net/uploads/46bf5bc2-2526-49e1-9b7b-f90b730ca900.png', user_id: 'test'}} 
        users={{test: {user_image: "https://bubble-media.net/uploads/46bf5bc2-2526-49e1-9b7b-f90b730ca900.png", display_name: 'Bubble'}}} />
        <Label label='Adjust fontsize of messages' />
        <VolumeSlider onChange={(value) => {dispatch(setAppearanceSettings({name: 'fontSize', value: value}))}} min={8} max={28} step={1} value={fontSize} />
        <Label label='Adjust The Maximum Height of Media' />
        <VolumeSlider min={100} max={400} step={10} value={maximumMediaHeight} onChange={(value) => {dispatch(setAppearanceSettings({name: 'maximumMediaHeight', value}))}} />
        </>
    )
}
