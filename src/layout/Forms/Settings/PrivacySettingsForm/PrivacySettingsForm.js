import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import ToggleSwitch from '../../../../components/Inputs/ToggleSwitch/ToggleSwitch'

export const PrivacySettingsForm = () => {
  return (
    <>
    <Header text='Privacy' />
    <Label label='Do not allow your posts to be publicly shareable' />
    <ToggleSwitch />
    <Label label='Your profile can only be viewed from within Bubbles' />
    <ToggleSwitch />
    
    </>
  )
}
