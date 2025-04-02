import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'

export const AppearanceSettingsForm = () => {
    return (
        <>
        <Header text='Appearance Settings' />
        <Label label='Select Theme' />
        <Label label='Hide Custom Channel Icons' />
        <ToggleSwitch />
        </>
    )
}
