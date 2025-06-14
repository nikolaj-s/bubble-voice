import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAppearanceSetting } from '../../../../features/Settings/Appearance/appearanceSlice'
import ThemePicker from '../../../../components/ThemePicker/ThemePicker'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { Description } from '../../../../components/ui/Description/Description'

export const AppearanceSettingsForm = () => {

    const dispatch = useDispatch();

    const {hideCustomChannelIcons, hideChannelBackgrounds, useBlackVoiceChannelBackground, disableStreamAmbiance} = useSelector(state => state.appearanceSlice);

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
        </>
    )
}
