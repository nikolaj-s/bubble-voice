import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import TextInput from '../../../../components/Inputs/TextInput/TextInput'
import ImageDropZone from '../../../../components/Inputs/ImageDropZone/ImageDropZone'
import TextButton from '../../../../components/Buttons/TextButton/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccount } from '../../../../features/Account/accountSlice'
import SpinnerLoading from '../../../../components/Loading/Spinner/SpinnerLoading'
import TextLabelError from '../../../../components/Error/TextLabelError/TextLabelError'
import { updateAccount } from '../../../../features/Account/Thunks/updateAccount'
import TextArea from '../../../../components/Inputs/TextArea/TextArea'
import ColorPicker from '../../../../components/Inputs/ColorPicker/ColorPicker'

export const AccountSettingsForm = () => {

  const dispatch = useDispatch();

  const [displayName, setDisplayName] = React.useState("");

  const [bio, setBio] = React.useState("");

  const [userImage, setUserImage] = React.useState(null);

  const [userBanner, setUserBanner] = React.useState(null);

  const [color, setColor] = React.useState("");

  const {updateLoading, updateError} = useSelector(state => state.accountSlice)

  const {display_name, user_image, user_banner, bio: user_bio, color: user_color} = useSelector(selectAccount);

  React.useEffect(() => {

    setDisplayName(display_name);

    setBio(user_bio);

    setColor(user_color);

  }, [display_name, user_bio, user_color])

  const handleUpdateAccount = () => {

    if (updateLoading) return;

    dispatch(updateAccount({userImage, userBanner, displayName, bio, color}));

    setUserImage(null);

    setUserBanner(null);

  }

  return (
    <>
    <Header text='Account Settings' />
    <Label label='Edit Display Name' />
    <TextInput value={displayName} onChange={setDisplayName} />
    <Label label='Edit Profile Image' />
    <ImageDropZone width={150} height={150} dimensions={300} borderRadius='50%' existingImage={user_image} onImageChange={setUserImage} />
    <Label label='Edit Profile Banner' />
    <ImageDropZone width={320} height={200} dimensions={800} existingImage={user_banner} onImageChange={setUserBanner} />
    <Label label='Bio' />
    <TextArea text={bio} setText={setBio} limit={512} placeholder='Enter a bio...' />
    <Label label='Choose An Accent Color' />
    <ColorPicker onColorChange={setColor} />
    {updateError ? <TextLabelError label='Error:' error={updateError} /> : null}
    <TextButton action={handleUpdateAccount} title='Update Account' />
    {updateLoading ? <SpinnerLoading /> : null}
    
    </>
  )
}
