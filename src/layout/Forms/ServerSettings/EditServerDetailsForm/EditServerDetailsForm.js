import React from 'react'
import Header from '../../../../components/Titles/Header/Header';
import Label from '../../../../components/Titles/Label/Label';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectServerBanner, selectServerName } from '../../../../features/ServerDetails/serverDetailsSlice';
import ImageDropZone from '../../../../components/Inputs/ImageDropZone/ImageDropZone';
import TextButton from '../../../../components/Buttons/TextButton/TextButton';
import { updateServerDetails } from '../../../../features/ServerDetails/Thunks/updateServerDetails';
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper';

export const EditServerDetailsForm = ({permissions}) => {

  const dispatch = useDispatch();

  const [serverName, setServerName] = React.useState("");

  const [serverBanner, setServerBanner] = React.useState(null);

  const [serverNameError, setServerNameError] = React.useState(false);

  const server_name = useSelector(selectServerName);
  
  const server_banner = useSelector(selectServerBanner);

  React.useEffect(() => {

    setServerName(server_name);

  }, [])
  
  const handleUpdate = () => {

    if (serverName.length < 5) return setServerNameError("Bubble name cannot be less than 5 characters long");

    if (serverName.length > 84) return setServerNameError("Bubble name cannot be longer than 84 characters long");

    if (serverName === server_name && !serverBanner) return;

    dispatch(updateServerDetails({serverName, serverBanner}));

    setServerBanner(null);
    
  }

  return (
    <LoadingErrorFormWrapper sliceName='serverDetailsSlice'>
      <Header text='Edit Bubble Details' />
      {permissions.user_can_edit_server_name ?
      <>
      <Label label='Edit Bubble Name:' />
      <TextInput value={serverName} error={serverNameError} onChange={setServerName} />
      </>
      : null}
      {permissions.user_can_edit_server_banner ?
      <>
      <Label label='Update Banner:' />
      <ImageDropZone width={320} height={200} existingImage={server_banner} onImageChange={setServerBanner}  />
      </>
      : null}

      {permissions.user_can_edit_server_banner || permissions.user_can_edit_server_name ?
      serverName !== server_name || serverBanner ?
      <TextButton action={handleUpdate} title='Submit' />
      : null :
      null
      }
    </LoadingErrorFormWrapper>
  )
}
