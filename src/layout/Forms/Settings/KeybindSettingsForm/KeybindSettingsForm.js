import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import KeybindInput from '../../../../components/ui/Inputs/KeybindInput/KeybindInput'
import { useDispatch, useSelector } from 'react-redux';
import { setKeybind } from '../../../../features/Settings/Keybinds/keybindsSlice';
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer';

export const KeybindSettingsForm = () => {
  const dispatch = useDispatch();
  
  // Get the current keybinds state from Redux
  const keybinds = useSelector((state) => state.keybindsSlice.keybinds);

  const handleKeybindChange = (actionType, keybind) => {
    // Dispatch an action to update the keybind
    dispatch(setKeybind({ actionType, keybind }));
  };

  return (
    <>
      <Header text="Keybind Settings" />
      <LineSpacer />
      <Header level={3} text='Media Control Binds' />
      <Label label="Push To Talk" />
      <KeybindInput
        currentKeybind={keybinds['pushToTalk'] || ''}
        onChange={(keybind) => handleKeybindChange('pushToTalk', keybind)}
      />
      <Label label="Mute / Unmute Microphone" />
      <KeybindInput
        currentKeybind={keybinds['muteMicrophone'] || ''}
        onChange={(keybind) => handleKeybindChange('muteMicrophone', keybind)}
      />
      <Label label="Deafen / Undeafen" />
      <KeybindInput
        currentKeybind={keybinds['deafen'] || ''}
        onChange={(keybind) => handleKeybindChange('deafen', keybind)}
      />
      <Label label="Enable / Disable Webcam" />
      <KeybindInput
        currentKeybind={keybinds['enableWebcam'] || ''}
        onChange={(keybind) => handleKeybindChange('enableWebcam', keybind)}
      />
      <Label label="Start / Stop Sharing Screen" />
      <KeybindInput
        currentKeybind={keybinds['startStopScreen'] || ''}
        onChange={(keybind) => handleKeybindChange('startStopScreen', keybind)}
      />
      <Label label='Disconnect From Channel' />
      <KeybindInput 
      currentKeybind={keybinds['disconnect'] || ''}
      onChange={(keybind) => handleKeybindChange('disconnect', keybind)}
      />
      <LineSpacer />
      <Header level={3} text='Misc Keybinds' />
      <Label label='Mute / Unmute Media Player' />
      <KeybindInput 
      currentKeybind={keybinds['muteMediaPlayer'] || ''}
      onChange={(keybind) => handleKeybindChange('muteMediaPlayer', keybind)}
      />
      {window?.electron && (
        <>
        <Label label='Screenshot' />
        <KeybindInput currentKeybind={keybinds['screenshot'] || ''} onChange={(keybind) => handleKeybindChange('screenshot', keybind)} />
        </>
      )}
    </>
  );
};
