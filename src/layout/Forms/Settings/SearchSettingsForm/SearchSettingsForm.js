import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import Label from '../../../../components/ui/Titles/Label/Label'

export const SearchSettingsForm = () => {
    return (
        <>
        <Header text='Edit Search Settings' />
        <Label label='Disable Safe Search' />
        <ToggleSwitch />
        <Label label='Show Full Resolution Previews' />
        <ToggleSwitch />
        </>
    )
}
