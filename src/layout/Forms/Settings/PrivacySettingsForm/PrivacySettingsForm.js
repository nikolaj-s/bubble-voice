import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { Description } from '../../../../components/ui/Description/Description'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { togglePreference } from '../../../../features/AccountPreferences/accountPreferencesSlice'

export const PrivacySettingsForm = () => {

  const dispatch = useDispatch();

  const {block_post_link_previews} = useSelector(state => state.accountPreferencesSlice);

  return (
    <>
    <Header text='Privacy' />
    <Label label='Disable Link Previews' />
    <Description description={"You can turn off rich previews for links in your posts within text channels. This helps protect your privacy, but note that links will no longer show images, titles, or summaries automatically."} />
    <ToggleSwitch initialState={block_post_link_previews} onToggle={() => {dispatch(togglePreference('block_post_link_previews'))}} />
    <LineSpacer />
    <Label label='Your profile can only be viewed from within Bubbles' />
    <ToggleSwitch />
    
    </>
  )
}
