import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAppearanceSetting } from '../../../../features/Settings/Appearance/appearanceSlice'
import ThemePicker from '../../../../components/ThemePicker/ThemePicker'

export const AppearanceSettingsForm = () => {

    const dispatch = useDispatch();

    const {hideCustomChannelIcons, hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);

    return (
        <>
        <Header text='Appearance Settings' />
        <Label label='Select Theme' />
        <ThemePicker />
        <Header level={3} text='Channels' />
        <Label label='Hide Custom Channel Icons' />
        <ToggleSwitch initialState={hideCustomChannelIcons} onToggle={() => {dispatch(toggleAppearanceSetting('hideCustomChannelIcons'))}} />
        <Label label='Hide Channel Backgrounds' />
        <ToggleSwitch initialState={hideChannelBackgrounds} onToggle={() => {dispatch(toggleAppearanceSetting('hideChannelBackgrounds'))}} />
        </>
    )
}
