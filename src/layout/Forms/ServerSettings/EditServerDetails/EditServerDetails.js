import React from 'react'
import Header from '../../../../components/Titles/Header/Header';
import Label from '../../../../components/Titles/Label/Label';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';
import { useSelector } from 'react-redux';
import { selectServerBanner, selectServerName } from '../../../../features/ServerDetails/serverDetailsSlice';
import ImageDropZone from '../../../../components/Inputs/ImageDropZone/ImageDropZone';
import { validateUsername } from '../../../../lib/handlers/inputValidation/inputValidation';
import TextButton from '../../../../components/Buttons/TextButton/TextButton';

export const EditServerDetails = ({permissions}) => {

  const [newServerName, setNewServerName] = React.useState("");

  const [serverNameError, setServerNameError] = React.useState(false);

  const [password, setPassword] = React.useState("");

  const [newServerBanner, setNewServerBanner] = React.useState(null);

  const serverName = useSelector(selectServerName);
  
  const serverBanner = useSelector(selectServerBanner);

  React.useEffect(() => {

    setNewServerName(serverName);

  }, [])
  
  const handleUpdate = () => {

    const formDate = new FormData();

    if (!validateUsername(newServerName)) return setServerNameError("Server name must have at least 3 characters, and contain no special character");

    formDate.append('server_name', newServerName);
  }

  return (
    <>
    <Header text='Edit Bubble Details' />
    {permissions.user_can_edit_server_name ?
    <>
    <Label label='Edit Bubble Name:' />
    <TextInput value={newServerName} onChange={setNewServerName} />
    </>
    : null}
    {permissions.user_can_edit_server_banner ?
    <>
    <Label label='Update Banner:' />
    <ImageDropZone width={320} height={200} existingImage={serverBanner} onImageChange={setNewServerBanner}  />
    </>
    : null}
    {permissions.user_can_edit_server_password ?
    <>
    <Label label='Update Password' />
    <TextInput type='password' value={password} onChange={setPassword} placeholder={"Enter Current Password"} />
    </>
    : null}
    {permissions.user_can_edit_server_banner || permissions.user_can_edit_server_name || permissions.user_can_edit_server_password ?
    <TextButton title='Submit' />
    : null}
    </>
  )
}
