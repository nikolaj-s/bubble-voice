import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { toggleContentState } from '../../../../features/Settings/Content/contentSettingsSlice'

export const ContentSettingsForm = () => {

    const dispatch = useDispatch();

    const { disableNsfwBlur }= useSelector(state => state.contentSettingsSlice);

    return (
       <>
       <Header text='Content Settings' />
       
       <Label label='Disable Blur of Explicit Content' />
       <ToggleSwitch initialState={disableNsfwBlur} onToggle={() => {
        dispatch(toggleContentState('disableNsfwBlur'))
       }} />
       </>
    )
}


