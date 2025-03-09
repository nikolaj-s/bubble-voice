import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import TextInput from '../../../../components/Inputs/TextInput/TextInput'
import ImageDropZone from '../../../../components/Inputs/ImageDropZone/ImageDropZone'
import TextButton from '../../../../components/Buttons/TextButton/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccount } from '../../../../features/Account/accountSlice'
import SpinnerLoading from '../../../../components/Loading/Spinner/SpinnerLoading'

export const AccountSettingsForm = () => {

  const dispatch = useDispatch();

  const [displayName, setDisplayName] = React.useState("");

  const {updateLoading, updateError} = useSelector(state => state.accountSlice)

  const {display_name} = useSelector(selectAccount);

  React.useEffect(() => {

    setDisplayName(display_name);

  }, [display_name])

  const handleUpdateAccount = () => {

  }

  return (
    <>
    <Header text='Account Settings' />
    <Label label='Edit Display Name' />
    <TextInput value={displayName} onChange={setDisplayName} />
    <Label label='Edit Profile Image' />
    <ImageDropZone width={150} height={150} borderRadius='50%' />
    <Label label='Edit Profile Banner' />
    <ImageDropZone width={320} height={200} />
    
    <TextButton title='Update Account' />
    {updateLoading ? <SpinnerLoading /> : null}
    </>
  )
}
