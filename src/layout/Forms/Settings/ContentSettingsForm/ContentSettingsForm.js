import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleContentState } from '../../../../features/Settings/Content/contentSettingsSlice'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { Description } from '../../../../components/ui/Description/Description'
import { togglePreference } from '../../../../features/AccountPreferences/accountPreferencesSlice'

export const ContentSettingsForm = () => {

    const dispatch = useDispatch();

    const { disableNsfwBlur, muteVideo }= useSelector(state => state.contentSettingsSlice);

    const { disable_content_filter_for_recommendations, disable_sensitive_content_warning } = useSelector(state => state.accountPreferencesSlice);

    return (
        <>
        <Header text='Content Settings' />
        <Header level={3} text='Media' />
        <Label label='Mute Video By Default' />
        <ToggleSwitch initialState={muteVideo} onToggle={() => {dispatch(toggleContentState('muteVideo'))}} />
        <LineSpacer />
        <Header level={3} text='Sensitive Content' />
        <Label label='Disable Sensitive Content Warning' />
        <ToggleSwitch initialState={disable_sensitive_content_warning} onToggle={() => {dispatch(togglePreference('disable_sensitive_content_warning'))}} />
        <Label label='Disable Blur of Explicit Content' />
        <ToggleSwitch initialState={disableNsfwBlur} onToggle={() => {
            dispatch(toggleContentState('disableNsfwBlur'))
        }} />
        <LineSpacer />
        <Header level={3} text='User Recommendations' />
        <Label label='Disable Content Filter For Your Recommendations' />
        <Description description={'Turning off the content filter may expose you to unmoderated or sensitive material in your recommendations. This setting is intended for advanced users—proceed only if you understand the risks.'} />
        <ToggleSwitch initialState={disable_content_filter_for_recommendations} onToggle={() => {dispatch(togglePreference('disable_content_filter_for_recommendations'))}} />
       </>
    )
}


