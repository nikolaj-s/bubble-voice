import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import ToggleSwitch from '../../../../components/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDisableNsfwBlur } from '../../../../features/Settings/Content/contentSettingsSlice'

export const ContentSettingsForm = () => {

    const dispatch = useDispatch();

    const disableNsfwBlur = useSelector(state => state.contentSettingsSlice.disableNsfwBlur);

    return (
       <>
       <Header text='Content Settings' />
       <Label label='Disable Safe Search Within Global Search' />
       <ToggleSwitch />
       <Label label='Disable Blur of Explicit Content' />
       <ToggleSwitch initialState={disableNsfwBlur} onToggle={() => {
        dispatch(toggleDisableNsfwBlur(!disableNsfwBlur))
       }} />
       </>
    )
}


