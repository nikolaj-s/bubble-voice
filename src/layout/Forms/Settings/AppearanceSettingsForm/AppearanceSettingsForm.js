import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAppearanceSetting } from '../../../../features/Settings/Appearance/appearanceSlice'
import ThemePicker from '../../../../components/ThemePicker/ThemePicker'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'

export const AppearanceSettingsForm = () => {

    const dispatch = useDispatch();

    const {hideCustomChannelIcons, hideChannelBackgrounds, useBlackVoiceChannelBackground} = useSelector(state => state.appearanceSlice);

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
        </>
    )
}
