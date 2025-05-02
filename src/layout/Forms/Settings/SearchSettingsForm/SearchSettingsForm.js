import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import Label from '../../../../components/ui/Titles/Label/Label'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearchSetting } from '../../../../features/Settings/SearchSettings/searchSettingsSlice'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'

export const SearchSettingsForm = () => {

    const dispatch = useDispatch();

    const {disableSafeSearch} = useSelector(state => state.searchSettingsSlice);

    return (
        <>
        <Header text='Edit Search Settings' />
        <Label label='Disable Safe Search' />
        <ToggleSwitch initialState={disableSafeSearch} onToggle={() => {dispatch(toggleSearchSetting('disableSafeSearch'))}} />
        <Label label='Show Full Resolution Previews' />
        <ToggleSwitch />
        <LineSpacer />
        <Header level={4} text='Handle Interacting With Images From Search' />
        <Label label='While in a text channel, clicking on an image result automatically sends it to your current channel' />
        <ToggleSwitch />
        </>
    )
}
