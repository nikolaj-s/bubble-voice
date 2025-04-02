import React from 'react'

import Header from '../../../../components/ui/Titles/Header/Header';

import Label from '../../../../components/ui/Titles/Label/Label';

import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput';

import { useDispatch, useSelector } from 'react-redux';

import { selectServerBanner, selectServerName } from '../../../../features/ServerDetails/serverDetailsSlice';

import ImageDropZone from '../../../../components/ui/Inputs/ImageDropZone/ImageDropZone';

import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton';

import { updateServerDetails } from '../../../../features/ServerDetails/Thunks/updateServerDetails';

import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper';
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized';

export const EditServerDetailsForm = ({permissions}) => {

  const dispatch = useDispatch();

  const [serverName, setServerName] = React.useState("");

  const [serverBanner, setServerBanner] = React.useState(null);

  const [serverNameError, setServerNameError] = React.useState(null);

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
    <NotAuthorized permission={permissions.user_can_edit_server_name && permissions.user_can_edit_server_banner}>
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
    </NotAuthorized>
  )
}
