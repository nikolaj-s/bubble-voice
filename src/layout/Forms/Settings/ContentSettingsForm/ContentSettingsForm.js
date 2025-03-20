import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import ToggleSwitch from '../../../../components/Inputs/ToggleSwitch/ToggleSwitch'

export const ContentSettingsForm = () => {



    return (
       <>
       <Header text='Content Settings' />
       <Label label='Disable Safe Search Within Global Search' />
       <ToggleSwitch />
       <Label label='Disable Blur of Explicit Content' />
       <ToggleSwitch />
       </>
    )
}


