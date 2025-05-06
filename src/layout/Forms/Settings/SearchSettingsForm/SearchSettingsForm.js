import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import Label from '../../../../components/ui/Titles/Label/Label'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearchSetting } from '../../../../features/Settings/SearchSettings/searchSettingsSlice'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { Description } from '../../../../components/ui/Description/Description'

export const SearchSettingsForm = () => {

    const dispatch = useDispatch();

    const {disableSafeSearch, showFullResolutionPreviews, autoSendOnClick} = useSelector(state => state.searchSettingsSlice);

    return (
        <>
        <Header text='Edit Search Settings' />
        <Label label='Disable Safe Search' />
        <Description description='Warning: Disabling Safe Search may expose you to unfiltered content, including material that may be inappropriate or not safe for work (NSFW). Use with caution, especially in shared or public environments.' />
        <ToggleSwitch initialState={disableSafeSearch} onToggle={() => {dispatch(toggleSearchSetting('disableSafeSearch'))}} />
        <LineSpacer />
        <Label label='Show Full Resolution Previews' />
        <Description  description={'Warning: rendering full resolution previews in search results will lead to increased ram usage.'}/>
        <ToggleSwitch initialState={showFullResolutionPreviews} onToggle={() => {dispatch(toggleSearchSetting('showFullResolutionPreviews'))}} />
        <LineSpacer />
        <Label label='Handle Interacting With Images From Search' />
        <Description description='While in a text channel, clicking on an image result automatically sends it to your current channel' />
        <ToggleSwitch initialState={autoSendOnClick} onToggle={() => {dispatch(toggleSearchSetting('autoSendOnClick'))}} />
        </>
    )
}
