// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectActivateCameraKey, selectDisconnectKey, selectMuteAudioKey, selectMuteMicKey, selectPushToTalkKey, selectShareScreenKey, updateKeyCodeState } from './keyBindSettingsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const [local, setLocal] = React.useState({})

    const [update, toggleUpdate] = React.useState(false);

    const pushToTalkkey = useSelector(selectPushToTalkKey);

    const muteMicKey = useSelector(selectMuteMicKey);

    const muteAudioKey = useSelector(selectMuteAudioKey);

    const activateCameraKey = useSelector(selectActivateCameraKey);

    const disconnectKey = useSelector(selectDisconnectKey);

    const shareScreenKey = useSelector(selectShareScreenKey);

    React.useEffect(() => {
        dispatch(setHeaderTitle('Key Bind Settings'))
    // eslint-disable-next-line
    }, [])

    const handleKeyCodeUpdate = (keyCode, state, event) => {
        
        if (event.key.includes('F')) return;

        if (event.keyCode === pushToTalkkey.keyCode) return;
        
        if (event.keyCode === muteMicKey.keyCode) return;

        if (event.keyCode === muteAudioKey.keyCode) return;

        if (event.keyCode === activateCameraKey.keyCode) return;

        if (event.keyCode === disconnectKey.keyCode) return;

        if (event.keyCode === shareScreenKey.keyCode) return;

        const obj = {...local, [state]: {key: event.nativeEvent.key, keyCode: event.keyCode}}
        
        setLocal(obj)
        
        toggleUpdate(true);
    
    }

    const saveKeyBinds = () => {
        dispatch(updateKeyCodeState(local))
        toggleUpdate(false)
    }

    const handleCancel = () => {
        setLocal({})
        toggleUpdate(false)
    }

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Media Binds"} />
            <InputTitle title={"Push To Talk"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='push_to_talk' inputValue={local['push_to_talk'] ? local['push_to_talk'].key : pushToTalkkey.key} />
            <InputTitle title={"Mute Mic"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='mute_mic' inputValue={local['mute_mic'] ? local['mute_mic'].key : muteMicKey.key} />
            <InputTitle title={"Mute Audio"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='mute_audio' inputValue={local['mute_audio'] ? local['mute_audio'].key : muteAudioKey.key} />
            <InputTitle title={"Activate Camera"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='activate_camera' inputValue={local['activate_camera'] ? local['activate_camera'].key : activateCameraKey.key} />
            <InputTitle title={"Share Screen"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='share_screen' inputValue={local['share_screen'] ? local['share_screen'].key : shareScreenKey.key} />
            <SettingsHeader title={"Misc"} />
            <InputTitle title={"Disconnect"} />
            <TextInput keyCode={handleKeyCodeUpdate} stateSelector='disconnect' inputValue={local['disconnect'] ? local['disconnect'].key : disconnectKey.key} />
            {update ? <ApplyCancelButton cancel={handleCancel} apply={saveKeyBinds} name='Save' /> : null}
            <SettingsSpacer />
        </div>
    )
}

export const KeyBindSettings = () => useRoutes([
    { path: "keybindings", element: <Settings /> }
])
