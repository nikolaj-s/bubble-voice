import React from 'react'

import Header from '../../../../components/ui/Titles/Header/Header';

import Label from '../../../../components/ui/Titles/Label/Label';

import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput';

import { useDispatch, useSelector } from 'react-redux';

import ImageDropZone from '../../../../components/ui/Inputs/ImageDropZone/ImageDropZone';

import { updateServerDetails } from '../../../../features/ServerDetails/Thunks/updateServerDetails';

import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper';

import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized';

import TextArea from '../../../../components/ui/Inputs/TextArea/TextArea';
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup';
import MarkdownHelp from '../../../../components/MarkdownHelp/MarkdownHelp';
import { getImageColorFromFile } from '../../../../lib/services/getImageColorFromFile';
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch';

export const EditServerDetailsForm = ({permissions}) => {

  const dispatch = useDispatch();

  const [serverName, setServerName] = React.useState("");

  const [welcomeMessage, setWelcomeMessage] = React.useState("");

  const [serverBanner, setServerBanner] = React.useState(null);

  const [serverNameError, setServerNameError] = React.useState(null);

  const [newColor, setNewColor] = React.useState(null);

  const [disablePinningWidgets, toggleDisablePinningWidgets] = React.useState(false);

  const {server_name, server_banner, welcome_message, color, disable_pinning_widgets} = useSelector(state => state.serverDetailsSlice.details);

  React.useEffect(() => {

    setDefaults();

  }, [])
console.log(disable_pinning_widgets, disablePinningWidgets)
  const handleServerColor = async file => {
    const l_color = await getImageColorFromFile(file);

    setNewColor(l_color);
  }

  React.useEffect(() => {

    if (serverBanner) {

      handleServerColor(serverBanner);

    }

  }, [serverBanner])
  
  const handleUpdate = () => {

    if (serverName.length < 4) return setServerNameError("Bubble name cannot be less than 5 characters long");

    if (serverName.length > 84) return setServerNameError("Bubble name cannot be longer than 84 characters long");

    if (serverName === server_name && !serverBanner && welcomeMessage === welcome_message && disablePinningWidgets === disable_pinning_widgets) return;

    dispatch(updateServerDetails({serverName, serverBanner, welcomeMessage, color: newColor, disablePinningWidgets}));

    setServerBanner(null);
    
  }

  const setDefaults = () => {

    setServerName(server_name);

    setWelcomeMessage(welcome_message);

    setServerBanner(null);

    setNewColor(null);

    toggleDisablePinningWidgets(typeof disable_pinning_widgets === 'boolean' ? disable_pinning_widgets : false);

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
        <ImageDropZone parentFileSrc={serverBanner} width={320} height={200} existingImage={server_banner} onImageChange={setServerBanner}  />
        </>
        : null}
        {permissions.user_can_edit_server_welcome_message && (
        <>
        <Label label='Edit Description:' />
        <MarkdownHelp />
        <TextArea 
         text={welcomeMessage}
        setText={(value) => {setWelcomeMessage(value)}}
        limit={512}
        />
        </>
        )}
         <LineSpacer margin={'30px 0px'} />
         {permissions?.user_can_manage_dashboard_settings && (
        <>
         <Header text='Dashboard' />
         <Label label='Disable Pinning Widgets To Dashboard' />
         <ToggleSwitch initialState={disablePinningWidgets} onToggle={() => {toggleDisablePinningWidgets(!disablePinningWidgets)}} />
         <ApplyChangesPopup 
         onApply={handleUpdate}
         onClearChanges={setDefaults}
         disabled={(serverName === server_name || serverName.trim().length < 3) && welcomeMessage === welcome_message && !serverBanner && disablePinningWidgets === disable_pinning_widgets} />
         </>
         )
         }
      </LoadingErrorFormWrapper>
    </NotAuthorized>
  )
}
