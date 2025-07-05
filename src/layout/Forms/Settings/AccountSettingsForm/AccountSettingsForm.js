import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import ImageDropZone from '../../../../components/ui/Inputs/ImageDropZone/ImageDropZone'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccount } from '../../../../features/Account/accountSlice'
import SpinnerLoading from '../../../../components/ui/Loading/Spinner/SpinnerLoading'
import TextLabelError from '../../../../components/Error/TextLabelError/TextLabelError'
import { updateAccount } from '../../../../features/Account/Thunks/updateAccount'
import TextArea from '../../../../components/ui/Inputs/TextArea/TextArea'
import ColorPicker from '../../../../components/ui/Inputs/ColorPicker/ColorPicker'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import { Power } from 'lucide-react'
import { logout } from '../../../../features/Auth/authSlice'
import MarkdownHelp from '../../../../components/MarkdownHelp/MarkdownHelp'

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

  const clearChanges = () => {
    setUserImage(null);

    setUserBanner(null);

    setBio(user_bio);

    setDisplayName(display_name);

    setColor(user_color);
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
    <Header text='Account Settings' />
    <Label label='Edit Display Name' />
    <TextInput value={displayName} onChange={setDisplayName} maxLength={15} />
    <Label label='Edit Profile Image' />
    <ImageDropZone parentFileSrc={userImage} width={150} height={150} dimensions={300} borderRadius='50%' existingImage={user_image} onImageChange={setUserImage} />
    <Label label='Edit Profile Banner' />
    <ImageDropZone parentFileSrc={userBanner} width={320} height={200} dimensions={1200} existingImage={user_banner} onImageChange={setUserBanner} />
    <Label label='Bio' />
    <MarkdownHelp />
    <TextArea text={bio} setText={setBio} limit={512} placeholder='Enter a bio...' />
    <Label label='Choose An Accent Color' />
    <ColorPicker onChange={setColor} value={color} />
    {updateError ? <TextLabelError label='Error:' error={updateError} /> : null}
    {updateLoading ? <SpinnerLoading /> : null}
    <LineSpacer />
    <TextButton action={handleLogout} title='Log out' maxWidth={150} backgroundColor={'var(--error-color)'} icon={<Power strokeWidth={3} size={15} color='var(--text-color)' />} />
    <ApplyChangesPopup 
    onClearChanges={clearChanges}
    disabled={color === user_color && display_name === displayName && userImage === null && userBanner === null && user_bio === bio}
    onApply={handleUpdateAccount}
    />
    </>
  )
}
