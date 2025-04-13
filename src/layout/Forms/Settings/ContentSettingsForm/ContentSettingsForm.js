import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleContentState } from '../../../../features/Settings/Content/contentSettingsSlice'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'

export const ContentSettingsForm = () => {

    const dispatch = useDispatch();

    const { disableNsfwBlur, muteVideo }= useSelector(state => state.contentSettingsSlice);

    return (
        <>
        <Header text='Content Settings' />
        <Header level={3} text='Media' />
        <Label label='Mute Video By Default' />
        <ToggleSwitch initialState={muteVideo} onToggle={() => {dispatch(toggleContentState('muteVideo'))}} />
        <LineSpacer />
        <Header level={3} text='Sensitive Content' />
        <Label label='Disable Age Restriction Warning' />
        <TextButton maxWidth={120} title='Confirm Age' />
        <Label label='Disable Blur of Explicit Content' />
        <ToggleSwitch initialState={disableNsfwBlur} onToggle={() => {
            dispatch(toggleContentState('disableNsfwBlur'))
        }} />
       </>
    )
}


